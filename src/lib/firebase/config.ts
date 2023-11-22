// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY ,
  authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN ,
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID ,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID ,
  measurementId: import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID ,
};

// - Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

//- Firestore exports
const analytics = getAnalytics(app);
//- Firestore exports
const db : Firestore = getFirestore(app);
//- Storage exports
const storage : FirebaseStorage = getStorage(app);

//- Default exports
export { analytics, storage };
export default db;
