import "@testing-library/jest-dom";
import { vi } from "vitest";

// Tests use fixtures rather than repository or hosting credentials.
vi.stubEnv("VITE_PASSWORD_UNO", "test-tenant-password");
vi.stubEnv("VITE_PASSWORD_DOS", "test-tenant-password-two");
vi.stubEnv("VITE_PASSWORD_TRES", "test-tenant-password-three");
vi.stubEnv("VITE_PASSWORD_ONE", "Devon");
vi.stubEnv("VITE_PASSWORD_TWO", "Oscar");
vi.stubEnv("VITE_PASSWORD_THREE", "Adrian");
vi.stubEnv("VITE_PASSWORD_ALPHA", "test-applicant-password");
vi.stubEnv("VITE_PASSWORD_BETA", "test-applicant-password-two");
vi.stubEnv("VITE_PASSWORD_MANGO", "test-applicant-password-three");
vi.stubEnv("VITE_PASSWORD_CHOCOLATE", "test-applicant-password-four");

// GlobalProvider fetches on mount. Keep the suite hermetic and offline.
vi.mock("@/lib/firebase/firestore", () => ({
  createApplicantDoc: vi.fn(),
  fetchApplicantPool: vi.fn().mockResolvedValue(undefined),
  specialCreateCollection: vi.fn(),
  updateDocument: vi.fn(),
  updateRanking: vi.fn(),
}));
