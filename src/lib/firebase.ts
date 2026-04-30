/**
 * Firebase configuration and initialization for Civic Compass AI.
 * Exports Firestore (for conversation logging) and Auth (for future use).
 * Gracefully handles missing configuration by using fallback values.
 */
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

/** Firebase project configuration sourced from environment variables */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock_key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock_domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock_project_id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock_bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "mock_sender",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "mock_app_id",
};

/** Singleton Firebase app — reuses existing instance if already initialized */
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/** Firebase Authentication instance */
export const auth: Auth = getAuth(app);

/** Cloud Firestore instance — used for conversation persistence */
export const db: Firestore = getFirestore(app);
