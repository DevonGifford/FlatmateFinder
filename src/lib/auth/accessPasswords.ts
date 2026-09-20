import type { TenantId } from "@/lib/constants/tenants";
import { tenants } from "@/lib/constants/tenants";

interface ApplicantAccessCredential {
  password: string | undefined;
}

interface TenantAccessCredential {
  password: string | undefined;
  tenantId: TenantId;
}

const tenantPasswords = [
  import.meta.env.VITE_TENANT_DEV_ACCESS_CODE,
  import.meta.env.VITE_TENANT_OSCAR_ACCESS_CODE,
  import.meta.env.VITE_TENANT_ADRIAN_ACCESS_CODE,
];

export const tenantAccess: TenantAccessCredential[] = tenants.map(
  (tenant, index) => ({
    password: tenantPasswords[index],
    tenantId: tenant.id,
  }),
);

export const applicantAccess: ApplicantAccessCredential[] = [
  { password: import.meta.env.VITE_APPLICANT_ACCESS_CODE },
];
