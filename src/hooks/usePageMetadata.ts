import { useEffect } from "react";

import { ROUTES } from "@/lib/routes";

function getPageTitle(pathname: string, locale: "EN" | "ES") {
  if (pathname === ROUTES.faq) {
    return locale === "ES"
      ? "Preguntas frecuentes | Flatmate Finder"
      : "Frequently Asked Questions | Flatmate Finder";
  }
  if (pathname === ROUTES.applicant.form) {
    return locale === "ES" ? "Solicitud | Flatmate Finder" : "Application | Flatmate Finder";
  }
  if (pathname === ROUTES.applicant.thankYou) {
    return locale === "ES" ? "Gracias | Flatmate Finder" : "Thank you | Flatmate Finder";
  }
  if (pathname.startsWith("/admin")) {
    return locale === "ES"
      ? "Área de inquilinos | Flatmate Finder"
      : "Tenant area | Flatmate Finder";
  }
  return "Flatmate Finder";
}

/**
 * Synchronizes the document title and HTML language with the current page.
 *
 * @param pathname - Current route pathname.
 * @param locale - Active application locale.
 */
export function usePageMetadata(pathname: string, locale: "EN" | "ES") {
  useEffect(() => {
    document.documentElement.lang = locale === "ES" ? "es" : "en";
    document.title = getPageTitle(pathname, locale);
  }, [locale, pathname]);
}
