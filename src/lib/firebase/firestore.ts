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
  getDocs,
} from "firebase/firestore";
import db from "./config";
import { ApplicationInterface } from "@/types/applicationInterfaces";
import { toastError, toastSuccess } from "../customToast";
import { ApplicantProfile } from "@/types/applicantInterfaces";
import { DispatchAction } from "@/types/globalStateInterfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Data = Record<string, any>;
export type CollectionName = string;
export type DocumentId = string;
const firestore: Firestore = db;

export const createApplicantDoc = async (
  documentId: DocumentId,
  userData: ApplicationInterface
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

export async function fetchApplicantPool(dispatch: DispatchAction) {
  try {
    const querySnapshot = await getDocs(collection(db, "applicants"));
    const fetchedData: ApplicantProfile[] = [];

    querySnapshot.forEach((doc) => {
      const {
        uuid,
        firstForm,
        secondForm,
        thirdForm,
        rankings,
        photo,
        applicationDate,
      } = doc.data();

      if (uuid && firstForm && secondForm && thirdForm && applicationDate) {
        const profile: ApplicantProfile = {
          id: doc.id,
          uuid,
          firstForm,
          secondForm,
          thirdForm,
          applicationDate,
          rankings,
          photo,
        };
        fetchedData.push(profile);
      }
    });

    dispatch({ type: "FETCH_SUCCESS", payload: fetchedData });
  } catch (err) {
    console.error("Error fetching data:", err);
    dispatch({ type: "FETCH_FAILURE", payload: "Something went wrong" });
  }
}

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
  } catch {
    toastError();
    return false;
  }
};

export const updateRanking = async (
  userId: string,
  updatedRankings: Partial<ApplicationInterface>
) => {
  const applicantDocRef = doc(db, "applicants", userId);

  try {
    const docSnapshot = await getDoc(applicantDocRef);
    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data() as ApplicationInterface;

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
