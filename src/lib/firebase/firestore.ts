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
 * Creates a uuid and new user document in the registration process.
 * @param {ApplicantProfile} userData - Partial user data for document creation.
 */
export const createApplicantDoc = async (userData: ApplicantProfile) => {
  console.log("createApplicantDoc:  💢 Triggered");

  // 👇 Create a uuid for the user
  // 🎯🧱 to do list - blocking issue
  // 🎯🧱 this uuid will be the documentID
  const documentId: DocumentId = "🎯insert custom name from above logic";

  // 👇 Check no document already exists for this user
  try {
    const collectionRef = collection(firestore, "applicants");
    const docRef: DocumentReference<Data> = doc(collectionRef, documentId);
    const docSnapshot: DocumentSnapshot<Data> = await getDoc(docRef);
    if (docSnapshot.exists()) {
      console.log(
        `⚠ Warning -  Document ${documentId} already exists in collection "users"`
      );
    } else {
      // 👇 Create a new document with provided user data
      await setDoc(docRef, userData);

      // 🤔👇 Update the state with the newly created user data
      // 🤔 still thinking if this is needed...

      // ✔ Handle Success Case
      console.log(
        `✔ Success - Document ${documentId} created successfully in collection "users"!`
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
