import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '@/hooks/useChat';

interface MessageItemProps {
  message: Message;
}

/**
 * MessageItem — Modular component for a single chat bubble.
 * Memoized to prevent re-renders when other messages change.
 */
const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        alignSelf: isModel ? 'flex-start' : 'flex-end',
        maxWidth: '85%',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      {isModel && <Avatar Icon={Bot} primary />}
      
      <div
        style={{
          backgroundColor: isModel ? 'var(--muted)' : 'var(--primary)',
          color: isModel ? 'var(--foreground)' : 'var(--primary-foreground)',
          padding: '0.85rem 1.15rem',
          borderRadius: 'var(--radius)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          borderBottomRightRadius: isModel ? 'var(--radius)' : 0,
          borderBottomLeftRadius: isModel ? 0 : 'var(--radius)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        {isModel ? (
          <div className="markdown-content">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          message.content
        )}
      </div>

      {!isModel && <Avatar Icon={User} />}
    </div>
  );
};

const Avatar = ({ Icon, primary }: { Icon: any; primary?: boolean }) => (
  <div
    aria-hidden="true"
    style={{
      width: '2.25rem',
      height: '2.25rem',
      borderRadius: '50%',
      backgroundColor: primary ? 'var(--primary)' : 'var(--secondary)',
      color: primary ? 'white' : 'var(--secondary-foreground)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <Icon size={18} />
  </div>
);

export default React.memo(MessageItem);
