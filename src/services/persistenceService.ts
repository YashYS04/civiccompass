import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * PersistenceService — Handles all database operations.
 * Separates data persistence from UI and business logic.
 */
export const PersistenceService = {
  /**
   * Saves a chat interaction to Firestore.
   * Fails silently in development if Firebase is unconfigured.
   */
  async saveChatTurn(userMsg: string, modelMsg: string): Promise<void> {
    try {
      await addDoc(collection(db, 'conversations'), {
        userMessage: userMsg,
        modelResponse: modelMsg,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('[PersistenceService] Firestore write skipped:', e);
    }
  }
};
