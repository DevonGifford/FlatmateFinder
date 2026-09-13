import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

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
// const analytics = getAnalytics(app);
const db : Firestore = getFirestore(app);
const auth = getAuth(app);

// Firestore rules require an authenticated request, while the product keeps its
// shared-password demo gate. Establish a temporary Firebase identity at startup.
export const authReady = signInAnonymously(auth);

export default db;
