import { tenants } from "@/lib/constants/tenants";
import type { TenantId } from "@/lib/constants/tenants";

interface ApplicantAccessCredential {
  password: string | undefined;
}

interface TenantAccessCredential {
  password: string | undefined;
  tenantId: TenantId;
}

const tenantPasswords = [
  import.meta.env.VITE_PASSWORD_UNO,
  import.meta.env.VITE_PASSWORD_DOS,
  import.meta.env.VITE_PASSWORD_TRES,
];

export const tenantAccess: TenantAccessCredential[] = tenants.map((tenant, index) => ({
  password: tenantPasswords[index],
  tenantId: tenant.id,
}));

export const applicantAccess: ApplicantAccessCredential[] = [
  { password: import.meta.env.VITE_PASSWORD_ALPHA },
  { password: import.meta.env.VITE_PASSWORD_BETA },
  { password: import.meta.env.VITE_PASSWORD_MANGO },
  { password: import.meta.env.VITE_PASSWORD_CHOCOLATE },
];
