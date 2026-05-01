import { useState, useCallback } from 'react';
import { ChatService } from '@/services/chatService';
import { PersistenceService } from '@/services/persistenceService';

export interface Message {
  role: 'user' | 'model';
  content: string;
}

/**
 * useChat — Custom hook to manage chat state.
 * Efficiency: Uses useCallback for the send function.
 * Quality: Delegates network and DB tasks to specialized services.
 */
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Namaste! I'm **Civic Compass AI**. How can I help you understand Indian elections today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const responseContent = await ChatService.getAiResponse([...messages, userMsg]);
      
      const modelMsg: Message = { role: 'model', content: responseContent };
      setMessages((prev) => [...prev, modelMsg]);
      
      // Persistence is a side-effect, handled by service
      PersistenceService.saveChatTurn(content, responseContent);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Connection error';
      setError(msg);
      setMessages((prev) => [...prev, { role: 'model', content: `Sorry, I encountered an error: ${msg}.` }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return { messages, isLoading, error, sendMessage };
}
