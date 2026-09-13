import {
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import db, { authReady } from "./config";
import { ApplicationInterface } from "@/types/applicationInterfaces";
import { ApplicantProfile } from "@/types/applicantInterfaces";
import { DispatchAction } from "@/types/globalStateInterfaces";
import {
  parseApplicantProfile,
} from "@/types/applicantSchemas";

export type DocumentId = string;
const firestore: Firestore = db;

export const waitForFirebaseAuth = () => authReady;

export const createApplicantDoc = async (
  documentId: DocumentId,
  userData: ApplicationInterface
) => {
  const collectionRef = collection(firestore, "applicants");
  const docRef: DocumentReference<DocumentData> = doc(
    collectionRef,
    documentId
  );
  const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
  if (docSnapshot.exists()) {
    throw new Error("Applicant document already exists");
  }

  await setDoc(docRef, userData);
};

export async function fetchApplicantPool(dispatch: DispatchAction) {
  try {
    const querySnapshot = await getDocs(collection(db, "applicants"));
    const fetchedData: ApplicantProfile[] = [];

    querySnapshot.forEach((doc) => {
      const profile = parseApplicantProfile(doc.id, doc.data());
      if (profile) fetchedData.push(profile);
    });

    dispatch({ type: "FETCH_SUCCESS", payload: fetchedData });
  } catch {
    dispatch({ type: "FETCH_FAILURE", payload: "Something went wrong" });
  }
}

export const updateRanking = async (
  userId: string,
  updatedRankings: Partial<NonNullable<ApplicantProfile["rankings"]>>
): Promise<void> => {
  const applicantDocRef = doc(db, "applicants", userId);

  const docSnapshot = await getDoc(applicantDocRef);
  if (!docSnapshot.exists()) throw new Error("Applicant document not found");

  const existingData = parseApplicantProfile(userId, docSnapshot.data());
  if (!existingData) throw new Error("Applicant document is invalid");

  const mergedRankings = {
    ...existingData.rankings,
    ...updatedRankings,
  };

  await updateDoc(applicantDocRef, { rankings: mergedRankings });
};
