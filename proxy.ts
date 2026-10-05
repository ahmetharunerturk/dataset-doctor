import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

/**
 * Next.js 16 proxy (formerly middleware) — locale-prefix routing for
 * /en /de /tr. Unprefixed URLs always redirect to English; language choices
 * are represented by the URL rather than browser headers or cookies.
 */
export default function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
