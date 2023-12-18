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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Data = Record<string, any>;
export type CollectionName = string;
export type DocumentId = string;

// 👇 Ensure the db object typing is Firestore
const firestore: Firestore = db;

/**
 * ✅ SUBMIT APPLICATION HELPER:
 * Creates a uuid and new user document in the submission process.
 * @param {ApplicantProfile} userData - Partial user data for document creation.
 * @param {DocumentId} userUUID - This will be the doc name
 *
 */
export const createApplicantDoc = async (
  documentId: DocumentId,
  userData: ApplicantProfile
) => {
  console.log("createApplicantDoc:  💢 Triggered");

  // 👇 Check no document already exists for this user
  try {
    const collectionRef = collection(firestore, "applicants");
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);
    if (docSnapshot.exists()) {
      console.log(
        `⚠ Warning -  Document ${documentId} already exists in collection db`
      );
    } else {
      // 👇 Create a new document with provided user data
      await setDoc(docRef, userData);

      // 🤔👇 Update the state with the newly created user data
      // 🤔 still thinking if this is needed...

      // ✔ Handle Success Case
      console.log(
        `✔ Success - Document ${documentId} created successfully in collection db!`
      );
    }
    // ✖ Handle error case
  } catch (error) {
    console.error(
      `✖ Error creating the document ${documentId} in given collection `,
      error
    );
  }
};

/**
 * ✅ HELPER FUNCTION:
 * Updates a specified document in a specified collection or creates a new document if not found.
 * @param {string} collectionName - The name of the collection.
 * @param {string} documentId - The ID of the document to be updated.
 * @param {object} data - The data to be updated or created.
 */
export const updateDocument = async (
  collectionName: CollectionName,
  documentId: DocumentId,
  data: Data
) => {
  console.log("🔥utils/firestore/updateDocument:  💢 Triggered");
  const collectionRef = collection(firestore, collectionName);
  const docRef: DocumentReference<Data> = doc(collectionRef, documentId);

  try {
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);

    // - check if user doc exists and update or else return false
    if (docSnapshot.exists()) {
      await updateDoc(docRef, data);
    } else {
      // -notfound case
      console.error(
        `🔥utils/firestore/updateDocument:  ❌ Error:  Document ${documentId} not found in collection ${collectionName}!`
      );
      return false;
    }
    // -success case
    console.log(
      `🔥utils/firestore/updateDocument:  ✔ Success:  Document ${documentId} updated successfully in collection ${collectionName}!`
    );
    return true;
  } catch (error) {
    // -error case
    console.error(
      `🔥utils/firestore/updateDocument:  ❌ Error:  Error updating/creating document ${documentId} in collection ${collectionName}: `,
      error
    );
    return false;
  }
};

export const updateRanking = async (
  userId: string,
  updatedRankings: Partial<ApplicantProfile>
) => {
  console.log("🔥utils/firestore/updateRanking:  💢 Triggered");
  const applicantDocRef = doc(db, "applicants", userId); // Replace "applicants" with your collection name

  try {
    await updateDoc(applicantDocRef, {
      rankings: updatedRankings,
    });
    console.log(`🔥utils/firestore/updateRanking:  ✔ Success:  Applicant document with ID ${userId} updated successfully.`);
  } catch (error) {
    console.error("🔥utils/firestore/updateRanking:  ✖ Error:  Error updating document: ", error);
    // Handle the error as needed
  }
};

//
/**
 * ✅ SPEACIAL ONE-TIME FUNCTION:
 * Creates a new collection based on input TypeScript type.
 * @param {string} collectionName - The name of the collection to be created.
 * @param {DocumentData} data - Data to be added to the collection.
 * @returns {Promise<boolean>} - A promise indicating whether the collection creation was successful.
 */
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
