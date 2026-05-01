import { useState, useCallback, useRef, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Message {
  role: 'user' | 'model';
  content: string;
}

/**
 * useChat — Custom hook to manage chat state and operations.
 * Separates business logic (API calls, state updates, persistence) from UI.
 */
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Namaste! I'm **Civic Compass AI**. I can help you understand India's election process. What would you like to know?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Persist conversation turn to Firestore */
  const persistConversation = async (userMsg: string, modelMsg: string) => {
    try {
      await addDoc(collection(db, 'conversations'), {
        userMessage: userMsg,
        modelResponse: modelMsg,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('Firebase persistence skipped:', e);
    }
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to fetch response');

      const modelMsg: Message = { role: 'model', content: data.content };
      setMessages((prev) => [...prev, modelMsg]);
      
      // Background persistence
      persistConversation(content, data.content);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errMsg);
      setMessages((prev) => [...prev, { role: 'model', content: `Error: ${errMsg}. Please try again.` }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, isLoading, error, sendMessage };
}
