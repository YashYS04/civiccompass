'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/** Shape of a single chat message */
interface Message {
  role: 'user' | 'model';
  content: string;
}

/**
 * ChatInterface — The core AI assistant component.
 * Sends user messages to /api/chat and renders Gemini responses as markdown.
 * Persists conversations to Firestore for session tracking.
 */
const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content:
        "Namaste! I'm **Civic Compass AI**. I can help you understand India's election process, check your eligibility, or find your polling booth. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /** Scroll chat to latest message */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /**
   * Persists a message pair to Firestore.
   * Wrapped in try/catch to gracefully handle missing Firebase config.
   */
  const saveToFirestore = async (userMsg: string, modelMsg: string) => {
    try {
      await addDoc(collection(db, 'conversations'), {
        userMessage: userMsg,
        modelResponse: modelMsg,
        createdAt: serverTimestamp(),
      });
    } catch {
      // Firebase may not be configured — fail silently in dev
    }
  };

  /** Sends the user's message to the API and appends the response */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: 'model', content: data.content }]);
        // Persist conversation turn to Firestore
        saveToFirestore(input, data.content);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'model', content: 'Sorry, I encountered an error. Please try again.' },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: 'Network error. Please check your connection.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="log"
      aria-label="AI Chat"
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        backgroundColor: 'var(--card)',
        overflow: 'hidden',
      }}
    >
      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
            }}
          >
            {msg.role === 'model' && (
              <div
                aria-hidden="true"
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Bot size={16} />
              </div>
            )}

            <div
              style={{
                backgroundColor: msg.role === 'user' ? 'var(--primary)' : 'var(--muted)',
                color: msg.role === 'user' ? 'var(--primary-foreground)' : 'var(--foreground)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.9375rem',
                lineHeight: 1.5,
                borderBottomRightRadius: msg.role === 'user' ? 0 : 'var(--radius)',
                borderBottomLeftRadius: msg.role === 'model' ? 0 : 'var(--radius)',
              }}
            >
              {msg.role === 'model' ? (
                <div className="markdown-content">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>

            {msg.role === 'user' && (
              <div
                aria-hidden="true"
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div
            role="status"
            aria-label="Loading response"
            style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}
          >
            <div
              aria-hidden="true"
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Bot size={16} />
            </div>
            <div
              style={{
                backgroundColor: 'var(--muted)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius)',
                borderBottomLeftRadius: 0,
                display: 'flex',
                gap: '0.25rem',
                alignItems: 'center',
              }}
            >
              <span className="loading-dot" style={{ animationDelay: '0s' }} />
              <span className="loading-dot" style={{ animationDelay: '0.2s' }} />
              <span className="loading-dot" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          padding: '1rem',
          borderTop: '1px solid var(--border)',
          gap: '0.5rem',
          backgroundColor: 'var(--background)',
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about voting, EVMs, eligibility..."
          disabled={isLoading}
          aria-label="Type your question"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Send message">
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default React.memo(ChatInterface);
