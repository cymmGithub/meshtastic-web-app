import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const MessageInput = ({ initialValue = '', onSendMessage }) => {
  const { t } = useLanguage();
  const [message, setMessage] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <div className="input-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('messageInput')}
          className="message-textarea"
          rows={4}
        />
      </div>
      <button type="submit" className="send-button">
        {t('sendButton')}
      </button>
    </form>
  );
};

export default MessageInput; 