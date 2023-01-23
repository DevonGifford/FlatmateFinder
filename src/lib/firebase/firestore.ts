import {
  Firestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import db from "./config";
import { ApplicantProfile } from "../types/applicant-type";
import { toastError, toastSuccess } from "../customToast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Data = Record<string, any>;
export type CollectionName = string;
export type DocumentId = string;
const firestore: Firestore = db;

export const createApplicantDoc = async (
  documentId: DocumentId,
  userData: ApplicantProfile
) => {
  try {
    const collectionRef = collection(firestore, "applicants");
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);
    if (docSnapshot.exists()) {
      console.error(`⚠ Warning -  Document already exists in collection db`);
    } else {
      await setDoc(docRef, userData);

      console.log(`✔ Success - Document successfully created`);
      toastSuccess("Application Submitted");
    }
  } catch (error) {
    console.error(`✖ Error creating the document in given collection `, error);
    toastError();
  }
};

export const updateDocument = async (
  collectionName: CollectionName,
  documentId: DocumentId,
  data: Data
) => {
  const collectionRef = collection(firestore, collectionName);
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);
    if (docSnapshot.exists()) {
      await updateDoc(docRef, data);
    } else {
      toastError();
      return false;
    }
    toastSuccess();
    return true;
  } catch (error) {
    toastError();
    return false;
  }
};

export const updateRanking = async (
  userId: string,
  updatedRankings: Partial<ApplicantProfile>
) => {
  const applicantDocRef = doc(db, "applicants", userId);

  try {
    const docSnapshot = await getDoc(applicantDocRef);
    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data() as ApplicantProfile;

      const mergedRankings = {
        ...existingData.rankings,
        ...updatedRankings,
      };

      await updateDoc(applicantDocRef, {
        rankings: mergedRankings,
      });

      // ✔ Success case
      toastSuccess();
    } else {
      // ✖ Error cases
      console.error(`✖ Error:  Document does not exist.`);
      toastError();
    }
  } catch (error) {
    console.error("✖ Error:  Error updating document: ", error);
    toastError();
  }
};

export const specialCreateCollection = async <T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<boolean> => {
  console.log(`specialCreateCollection:  💢 Triggered`);
  try {
    const dataCollection = collection(firestore, collectionName);
    await addDoc(dataCollection, data);
    console.log(`✔ Success:  Added ${collectionName} collection with data.`);
    return true;
  } catch (error) {
    console.error(`❌ Error adding document: ${error}`);
    return false;
  }
};
