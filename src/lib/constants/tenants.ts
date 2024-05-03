export const tenants = [
  { id: "dev", name: "Devon" },
  { id: "osc", name: "Oscar" },
  { id: "adr", name: "Adrian" },
] as const;

export type TenantId = (typeof tenants)[number]["id"];
export type TenantStarKey = `${TenantId}_star`;
export type TenantBooleanKey = `${TenantId}_bool`;

export const getTenantByName = (name: string | undefined) =>
  tenants.find((tenant) => tenant.name === name);
