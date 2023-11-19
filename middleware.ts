import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "uz"],
  defaultLocale: "uz",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
