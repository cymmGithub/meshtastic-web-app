import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const MessageHistory = ({ messages }) => {
  const { t } = useLanguage();
  
  if (!messages || messages.length === 0) {
    return null;
  }
  
  return (
    <div className="message-history">
      <h3 className="section-title">{t('messageHistory')}</h3>
      <div className="messages-list">
        {messages.map((message, index) => (
          <div key={index} className="message-item">
            <div className="message-content">{message.text}</div>
            <div className="message-meta">
              <span className="message-time">{message.timestamp}</span>
              <span className="message-status">{message.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageHistory; 