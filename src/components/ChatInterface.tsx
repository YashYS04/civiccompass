'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useChat } from '@/hooks/useChat';

/**
 * ChatInterface — The core AI assistant UI component.
 * Uses the useChat hook for business logic and message management.
 */
const ChatInterface: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /** Efficiency: Scroll to bottom only when messages change */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div
      role="log"
      aria-label="AI Chat History"
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
      {/* Chat Messages Container */}
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
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Bot size={18} />
              </div>
            )}

            <div
              style={{
                backgroundColor: msg.role === 'user' ? 'var(--primary)' : 'var(--muted)',
                color: msg.role === 'user' ? 'var(--primary-foreground)' : 'var(--foreground)',
                padding: '0.85rem 1.1rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                borderBottomRightRadius: msg.role === 'user' ? 0 : 'var(--radius)',
                borderBottomLeftRadius: msg.role === 'model' ? 0 : 'var(--radius)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
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
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <User size={18} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}>
            <div
              aria-hidden="true"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Bot size={18} />
            </div>
            <div
              style={{
                backgroundColor: 'var(--muted)',
                padding: '0.85rem 1.1rem',
                borderRadius: 'var(--radius)',
                borderBottomLeftRadius: 0,
                display: 'flex',
                gap: '0.35rem',
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

      {/* Input Section */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          padding: '1rem',
          borderTop: '1px solid var(--border)',
          gap: '0.75rem',
          backgroundColor: 'var(--background)',
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about voter ID, rules, or polling..."
          disabled={isLoading}
          aria-label="Message assistant"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Send">
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default React.memo(ChatInterface);
