export const tenants = [
  { id: "dev", name: "Devon" },
  { id: "osc", name: "Oscar" },
  { id: "adr", name: "Adrian" },
] as const;

export type TenantId = (typeof tenants)[number]["id"];
export type TenantStarKey = `${TenantId}_star`;
export type TenantBooleanKey = `${TenantId}_bool`;

export const getTenantById = (id: TenantId | undefined) =>
  tenants.find((tenant) => tenant.id === id);

// Used only when migrating sessions written by releases that stored names.
export const getTenantByName = (name: string | undefined) =>
  tenants.find((tenant) => tenant.name === name);
