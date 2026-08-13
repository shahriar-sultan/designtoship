/**
 * Seeds a BFF admin user in MongoDB (collection `bff_admin_users`) and prints a JWT
 * suitable for `Authorization: Bearer <token>` on `PATCH /api/admin/users/:id/approve`.
 *
 * Usage: npm run seed:bff-admin
 *
 * Env: BFF_REGISTRATION_MONGODB_URI (required), JWT secret (see getAdminJwtSecret),
 * optional BFF_SEED_ADMIN_EMAIL, BFF_SEED_ADMIN_PASSWORD, BFF_SEED_ADMIN_ROTATE=1
 */
import { config } from "dotenv";
import { resolve } from "node:path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

function printMongoConnectionHints(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  console.error("\nCould not connect to MongoDB.");
  console.error(msg);

  const srvDns =
    msg.includes("querySrv") ||
    msg.includes("_mongodb._tcp") ||
    (msg.includes("ECONNREFUSED") && msg.includes("mongodb"));

  if (srvDns || msg.includes("ENOTFOUND")) {
    console.error(`
Fixes that usually work for "querySrv ECONNREFUSED" / SRV DNS issues:

1) Use a non-SRV URI from Atlas (avoids _mongodb._tcp DNS lookups)
   - Atlas → Connect → Drivers → copy the connection string, then choose the
     format that lists hosts as mongodb://host1:27017,host2:27017/...
     (not mongodb+srv://).
   - Put that value in BFF_REGISTRATION_MONGODB_URI (same user/password/query params).

2) Fix DNS on your machine / network
   - Try DNS 8.8.8.8 or 1.1.1.1; disable VPN; corporate firewalls often block SRV.

3) Atlas Network Access
   - Allow your current IP (or 0.0.0.0/0 for dev only).

4) Optional: force IPv4 for the driver (helps some IPv6 routing issues, not pure SRV DNS blocks)
   - Set BFF_MONGOOSE_IPV4_ONLY=1 in .env.local and retry.

5) Optional: use public DNS only for this Node process (often fixes SRV on bad corporate DNS)
   - Add to .env.local: BFF_MONGOOSE_DNS_SERVERS=8.8.8.8,1.1.1.1
   - Then run the seed again. (Affects all DNS lookups in that process.)

6) Non-production + mongodb+srv: this repo auto-uses 8.8.8.8 and 1.1.1.1 before connect unless
   BFF_MONGOOSE_DNS_AUTO_PUBLIC=0. If you still see querySrv errors, switch URI to mongodb:// (see 1).
`);
  }
}

async function getAdminJwtSecret(): Promise<string> {
  const secret =
    process.env.BFF_REGISTRATION_JWT_SECRET?.trim() ??
    process.env.JWT_SECRET?.trim() ??
    process.env.NEXTAUTH_SECRET?.trim();
  if (!secret) {
    throw new Error(
      "Set BFF_REGISTRATION_JWT_SECRET, JWT_SECRET, or NEXTAUTH_SECRET before seeding.",
    );
  }
  return secret;
}

async function main() {
  const uri = process.env.BFF_REGISTRATION_MONGODB_URI?.trim();
  if (!uri) {
    console.error("Missing BFF_REGISTRATION_MONGODB_URI.");
    process.exit(1);
  }

  const email = (
    process.env.BFF_SEED_ADMIN_EMAIL ?? "admin@local.dev"
  ).toLowerCase();

  if (process.env.NODE_ENV === "production" && !process.env.BFF_SEED_ADMIN_PASSWORD?.trim()) {
    console.error("In production, set BFF_SEED_ADMIN_PASSWORD explicitly.");
    process.exit(1);
  }

  const password =
    process.env.BFF_SEED_ADMIN_PASSWORD?.trim() ?? "DevSeed!ChangeMe1";

  const rotate = process.env.BFF_SEED_ADMIN_ROTATE === "1";

  try {
    const { connectRegistrationDb } = await import(
      "../lib/bff/two-gate-registration/db",
    );
    await connectRegistrationDb();
  } catch (err) {
    printMongoConnectionHints(err);
    process.exit(1);
  }

  const { BffAdminUser } = await import(
    "../lib/bff/two-gate-registration/models/BffAdminUser"
  );
  const { RegistrationUser } = await import(
    "../lib/bff/two-gate-registration/models/User"
  );

  await RegistrationUser.syncIndexes().catch(() => undefined);
  await BffAdminUser.syncIndexes().catch(() => undefined);

  const passwordHash = await bcrypt.hash(password, 12);
  let admin = await BffAdminUser.findOne({ email });

  if (!admin) {
    admin = await BffAdminUser.create({ email, passwordHash });
    console.log(`Created BFF admin user: ${email}`);
  } else if (rotate) {
    admin.passwordHash = passwordHash;
    await admin.save();
    console.log(`Updated password for BFF admin user: ${email}`);
  } else {
    console.log(`BFF admin user already exists: ${email} (set BFF_SEED_ADMIN_ROTATE=1 to change password)`);
  }

  const secret = await getAdminJwtSecret();
  const token = jwt.sign(
    {
      sub: admin._id.toString(),
      email: admin.email,
      role: "ADMIN",
    },
    secret,
    { expiresIn: "7d" },
  );

  console.log("\n--- Postman / API ---");
  console.log("Authorization: Bearer <token below>");
  console.log("\nToken (7d):\n");
  console.log(token);
  console.log("\n--- Done ---\n");

  const { disconnectRegistrationDb } = await import(
    "../lib/bff/two-gate-registration/db",
  );
  await disconnectRegistrationDb();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
