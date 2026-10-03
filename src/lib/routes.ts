export const ROUTES = {
  home: "/",
  faq: "/FAQ",
  applicant: {
    form: "/form",
    thankYou: "/thankyou",
  },
  tenant: {
    welcome: "/admin-welcome",
    tinder: "/admin-tinder",
    leaderboard: "/admin-leaderboard",
  },
} as const;

const publicRoutes = [ROUTES.home, ROUTES.faq];
const applicantRoutes = [ROUTES.applicant.form, ROUTES.applicant.thankYou];
const tenantRoutes = [ROUTES.tenant.welcome, ROUTES.tenant.tinder, ROUTES.tenant.leaderboard];

export function isPublicRoute(pathname: string) {
  return publicRoutes.includes(pathname as (typeof publicRoutes)[number]);
}

export function isApplicantRoute(pathname: string) {
  return applicantRoutes.includes(pathname as (typeof applicantRoutes)[number]);
}

export function isTenantRoute(pathname: string) {
  return tenantRoutes.includes(pathname as (typeof tenantRoutes)[number]);
}
