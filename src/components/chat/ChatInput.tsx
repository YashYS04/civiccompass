import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled: boolean;
}

/**
 * ChatInput — Standalone input component for the chat interface.
 * Encapsulates internal form state to prevent parent re-renders on every keystroke.
 */
const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText('');
  };

  return (
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
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your question..."
        disabled={disabled}
        aria-label="Ask a question"
      />
      <Button type="submit" disabled={disabled || !text.trim()} size="icon" aria-label="Send message">
        <Send size={18} />
      </Button>
    </form>
  );
};

export default React.memo(ChatInput);
