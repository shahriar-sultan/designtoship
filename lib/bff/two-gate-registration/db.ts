import mongoose, { type ConnectOptions } from "mongoose";
import dns from "node:dns";

const globalForMongoose = globalThis as unknown as {
  bffRegistrationMongoose?: typeof mongoose;
};

let bffMongooseDnsServersApplied = false;
let bffMongooseAutoDnsLogged = false;

/**
 * Configures Node's DNS resolver before `mongodb+srv` SRV lookups.
 *
 * 1. **`BFF_MONGOOSE_DNS_SERVERS`** — comma-separated resolver IPs (e.g. `8.8.8.8,1.1.1.1`).
 * 2. **Development + `mongodb+srv`** — if (1) is unset and `BFF_MONGOOSE_DNS_AUTO_PUBLIC` is not `0`,
 *    uses `8.8.8.8` and `1.1.1.1` once. Helps `querySrv ECONNREFUSED` on Windows / bad default DNS.
 *
 * Uses `dns.setServers()` — affects the whole Node process. Production unchanged unless (1) is set.
 */
export function applyBffMongooseDnsServers(mongoUri: string): void {
  if (bffMongooseDnsServersApplied) return;

  const explicit = process.env.BFF_MONGOOSE_DNS_SERVERS?.trim();
  if (explicit) {
    const servers = explicit
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (servers.length > 0) {
      try {
        dns.setServers(servers);
        bffMongooseDnsServersApplied = true;
      } catch {
        // Invalid entries — skip.
      }
    }
    return;
  }

  const autoDisabled = process.env.BFF_MONGOOSE_DNS_AUTO_PUBLIC === "0";
  const allowAutoPublicDns =
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "test";
  const isSrv = mongoUri.startsWith("mongodb+srv://");

  if (!autoDisabled && allowAutoPublicDns && isSrv) {
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      bffMongooseDnsServersApplied = true;
      if (!bffMongooseAutoDnsLogged) {
        bffMongooseAutoDnsLogged = true;
        console.info(
          "[bff-registration] Using public DNS (8.8.8.8, 1.1.1.1) for mongodb+srv (non-production). Set BFF_MONGOOSE_DNS_AUTO_PUBLIC=0 to disable, or set BFF_MONGOOSE_DNS_SERVERS.",
        );
      }
    } catch {
      // ignore
    }
  }
}

/**
 * Mongoose options for Atlas / corporate networks.
 * Set `BFF_MONGOOSE_IPV4_ONLY=1` if IPv6 routes break server selection (does not fix broken SRV DNS).
 */
export function getRegistrationMongooseConnectOptions(): ConnectOptions {
  const options: ConnectOptions = {
    serverSelectionTimeoutMS: 30_000,
  };
  if (
    process.env.BFF_MONGOOSE_IPV4_ONLY === "1" ||
    process.env.BFF_MONGOOSE_DNS_FAMILY === "ipv4"
  ) {
    options.family = 4;
  }
  return options;
}

/**
 * Reuse the connection across Next.js hot reloads / serverless invocations.
 */
export async function connectRegistrationDb(): Promise<typeof mongoose> {
  const uri = process.env.BFF_REGISTRATION_MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("BFF_REGISTRATION_MONGODB_URI is not configured");
  }

  if (globalForMongoose.bffRegistrationMongoose?.connection?.readyState === 1) {
    return globalForMongoose.bffRegistrationMongoose;
  }

  applyBffMongooseDnsServers(uri);

  const instance = await mongoose.connect(
    uri,
    getRegistrationMongooseConnectOptions(),
  );
  globalForMongoose.bffRegistrationMongoose = instance;
  return instance;
}

/** For one-off scripts (e.g. seed): closes the pool and clears the dev hot-reload cache. */
export async function disconnectRegistrationDb(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  globalForMongoose.bffRegistrationMongoose = undefined;
}
