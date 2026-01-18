import { beforeEach, vi } from "vitest";

beforeEach(() => {
  sessionStorage.clear();
  vi.clearAllMocks();
});

vi.mock("@/lib/auth/accessPasswords", () => ({
  tenantAccess: [
    { password: "test-tenant-password", tenantId: "dev" },
    { password: "test-tenant-password-two", tenantId: "osc" },
    { password: "test-tenant-password-three", tenantId: "adr" },
  ],
  applicantAccess: [
    { password: "test-applicant-password" },
    { password: "test-applicant-password-two" },
    { password: "test-applicant-password-three" },
    { password: "test-applicant-password-four" },
  ],
}));

// GlobalProvider fetches on mount. Keep the suite hermetic and offline.
vi.mock("@/lib/firebase/firestore", () => ({
  createApplicantDoc: vi.fn(),
  fetchApplicantPool: vi.fn().mockResolvedValue([]),
  waitForFirebaseAuth: vi.fn().mockResolvedValue(undefined),
  updateRanking: vi.fn(),
}));
