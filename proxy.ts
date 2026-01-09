import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the next-intl middleware using the routing config
const intlMiddleware = createMiddleware(routing);

// Export it directly - this should handle all locale routing
export default intlMiddleware;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
