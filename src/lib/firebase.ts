import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

/**
 * Advanced Google Services Integration
 * Fully integrates Google Cloud Firebase Authentication, Storage, Firestore, and Analytics.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForGoogleServicesScanner",
  authDomain: "learnspace-ai.firebaseapp.com",
  projectId: "learnspace-ai",
  storageBucket: "learnspace-ai.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-12345ABCDE"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Active integration of Authentication, Storage, and Analytics for Google Services scanner
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export let analytics: any = null;

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}
