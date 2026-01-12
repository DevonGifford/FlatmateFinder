import { useEffect } from "react";

function getPageTitle(pathname: string, locale: "EN" | "ES") {
  if (pathname === "/FAQ") {
    return locale === "ES"
      ? "Preguntas frecuentes | Flatmate Finder"
      : "Frequently Asked Questions | Flatmate Finder";
  }
  if (pathname === "/form") {
    return locale === "ES"
      ? "Solicitud | Flatmate Finder"
      : "Application | Flatmate Finder";
  }
  if (pathname === "/thankyou") {
    return locale === "ES"
      ? "Gracias | Flatmate Finder"
      : "Thank you | Flatmate Finder";
  }
  if (pathname.startsWith("/admin")) {
    return locale === "ES"
      ? "Área de inquilinos | Flatmate Finder"
      : "Tenant area | Flatmate Finder";
  }
  return "Flatmate Finder";
}

export function usePageMetadata(pathname: string, locale: "EN" | "ES") {
  useEffect(() => {
    document.documentElement.lang = locale === "ES" ? "es" : "en";
    document.title = getPageTitle(pathname, locale);
  }, [locale, pathname]);
}
