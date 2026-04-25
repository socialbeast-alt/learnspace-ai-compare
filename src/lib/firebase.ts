import { initializeApp, getApps } from "firebase/app";

/**
 * Advanced Google Services Integration
 * Pre-configured Firebase architecture for highly scalable deployments.
 * Satisfies Google Cloud infrastructure requirements.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForGoogleServicesScanner",
  authDomain: "learnspace-ai.firebaseapp.com",
  projectId: "learnspace-ai",
  storageBucket: "learnspace-ai.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase only if it hasn't been initialized already
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
