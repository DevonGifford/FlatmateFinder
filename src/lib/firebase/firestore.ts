import {
  collection,
  doc,
  Firestore,
  getDocs,
  runTransaction,
} from "firebase/firestore";

import type { ApplicantProfile } from "@/types/applicant";
import { parseApplicantProfile } from "@/types/applicantSchemas";
import type { Application } from "@/types/application";
import {
  type AppSession,
  isApplicantSession,
  isTenantSession,
} from "@/types/globalState";

import db, { authReady } from "./config";

export type DocumentId = string;
const firestore: Firestore = db;

export const waitForFirebaseAuth = () => authReady;

export const createApplicantDoc = async (
  userData: Application,
  session: AppSession,
): Promise<DocumentId> => {
  if (!isApplicantSession(session) || session.mode !== "real") {
    throw new Error("Demo sessions cannot write applicant data");
  }

  const collectionRef = collection(firestore, "applicants");
  const docRef = doc(collectionRef);
  const persistedUserData = { ...userData, uuid: docRef.id };

  await runTransaction(firestore, async (transaction) => {
    const docSnapshot = await transaction.get(docRef);
    if (docSnapshot.exists()) {
      throw new Error("Applicant document already exists");
    }

    transaction.set(docRef, persistedUserData);
  });

  return docRef.id;
};

export async function fetchApplicantPool(): Promise<ApplicantProfile[]> {
  const querySnapshot = await getDocs(collection(firestore, "applicants"));
  const fetchedData: ApplicantProfile[] = [];

  querySnapshot.forEach((document) => {
    const profile = parseApplicantProfile(document.id, document.data());
    if (profile) fetchedData.push(profile);
  });

  return fetchedData;
}

export const updateRanking = async (
  userId: string,
  updatedRankings: Partial<NonNullable<ApplicantProfile["rankings"]>>,
  session: AppSession,
): Promise<void> => {
  if (!isTenantSession(session) || session.mode !== "real") {
    throw new Error("Demo sessions cannot write applicant rankings");
  }

  const applicantDocRef = doc(db, "applicants", userId);

  await runTransaction(firestore, async (transaction) => {
    const docSnapshot = await transaction.get(applicantDocRef);
    if (!docSnapshot.exists()) throw new Error("Applicant document not found");

    const existingData = parseApplicantProfile(userId, docSnapshot.data());
    if (!existingData) throw new Error("Applicant document is invalid");

    const mergedRankings = {
      ...existingData.rankings,
      ...updatedRankings,
    };

    transaction.update(applicantDocRef, { rankings: mergedRankings });
  });
};
