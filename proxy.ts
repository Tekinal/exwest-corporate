import { NextRequest, NextResponse } from "next/server";

const supportedLocales = ["de", "en"] as const;
const preferenceCookie = "exwest_locale";

type Locale = (typeof supportedLocales)[number];

function selectLocale(request: NextRequest): Locale {
  const stored = request.cookies.get(preferenceCookie)?.value;
  if (stored === "de" || stored === "en") return stored;

  const accepted = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const preferred = accepted
    .split(",")
    .map((entry, index) => {
      const [tag, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const quality = qualityParameter ? Number.parseFloat(qualityParameter.split("=")[1]) : 1;
      return { locale: tag.split("-")[0], quality: Number.isFinite(quality) ? quality : 0, index };
    })
    .filter((entry) => entry.locale === "de" || entry.locale === "en")
    .sort((a, b) => b.quality - a.quality || a.index - b.index)[0]?.locale;

  return preferred === "en" ? "en" : "de";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const selectedLocale = selectLocale(request);

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${selectedLocale}`, request.url));
  }

  if (pathname === "/impressum") {
    return NextResponse.redirect(new URL(selectedLocale === "de" ? "/de/impressum" : "/en/imprint", request.url));
  }

  if (pathname === "/datenschutz") {
    return NextResponse.redirect(new URL(selectedLocale === "de" ? "/de/datenschutz" : "/en/privacy", request.url));
  }

  const locale = supportedLocales.find(
    (candidate) => pathname === `/${candidate}` || pathname.startsWith(`/${candidate}/`),
  );

  if (!locale) return NextResponse.next();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-exwest-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|site.webmanifest|robots.txt|sitemap.xml).*)"],
};
