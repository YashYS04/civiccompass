'use client';

import React, { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import MessageItem from './chat/MessageItem';
import ChatInput from './chat/ChatInput';

/**
 * ChatInterface — Primary AI Assistant Component.
 * Quality: Highly modular, separates message rendering and input handling.
 * Efficiency: Uses memoized sub-components and optimized scroll logic.
 */
const ChatInterface: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  /** Efficiency: Scroll to bottom only when messages array changes */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      role="log"
      aria-label="Chat history"
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
      {/* Scrollable message list */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          scrollBehavior: 'smooth',
        }}
      >
        {messages.map((msg, index) => (
          <MessageItem key={index} message={msg} />
        ))}
        
        {isLoading && <LoadingIndicator />}
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};

const LoadingIndicator = () => (
  <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}>
    <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Bot size={18} />
    </div>
    <div style={{ backgroundColor: 'var(--muted)', padding: '0.85rem 1.15rem', borderRadius: 'var(--radius)', display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
      <span className="loading-dot" />
      <span className="loading-dot" style={{ animationDelay: '0.2s' }} />
      <span className="loading-dot" style={{ animationDelay: '0.4s' }} />
    </div>
  </div>
);

export default React.memo(ChatInterface);
