import { tenants } from "@/lib/constants/tenants";

export interface AccessCredential {
  password: string | undefined;
  displayName?: string;
}

const tenantPasswords = [
  import.meta.env.VITE_PASSWORD_UNO,
  import.meta.env.VITE_PASSWORD_DOS,
  import.meta.env.VITE_PASSWORD_TRES,
];

export const tenantAccess: AccessCredential[] = tenants.map((tenant, index) => ({
  password: tenantPasswords[index],
  displayName: tenant.name,
}));

export const applicantAccess: AccessCredential[] = [
  { password: import.meta.env.VITE_PASSWORD_ALPHA },
  { password: import.meta.env.VITE_PASSWORD_BETA },
  { password: import.meta.env.VITE_PASSWORD_MANGO },
  { password: import.meta.env.VITE_PASSWORD_CHOCOLATE },
];
