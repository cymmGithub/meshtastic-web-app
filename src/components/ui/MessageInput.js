import React, { useState, useEffect } from 'react';
import { 
  Box, 
  FormControl, 
  Textarea, 
  Button, 
  HStack, 
  useColorModeValue,
} from '@chakra-ui/react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SpeechRecognition } from '../accessibility';

const MessageInput = ({ initialValue = '', onSendMessage }) => {
  const { t } = useLanguage();
  const [message, setMessage] = useState(initialValue);
  
  // Update message when initialValue changes (e.g. when a template is selected)
  useEffect(() => {
    setMessage(initialValue);
  }, [initialValue]);
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter to send message
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle speech recognition transcript
  const handleVoiceInput = (transcript) => {
    setMessage(prev => {
      // If there's existing text, add a space before the transcription
      const space = prev.trim() ? ' ' : '';
      return prev + space + transcript;
    });
  };
  
  return (
    <Box>
      <FormControl>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('messageInput')}
          size="md"
          rows={5}
          mb={4}
          bg={useColorModeValue('white', 'gray.700')}
          resize="vertical"
          aria-label={t('messageInput')}
        />
      </FormControl>
      
      <HStack spacing={4} justify="space-between">
        <SpeechRecognition 
          onTranscript={handleVoiceInput} 
          placeholder={t('speakNow')}
        />
        
        <Button 
          colorScheme="blue" 
          onClick={handleSend}
          isDisabled={!message.trim()}
          aria-label={t('sendButton')}
        >
          {t('sendButton')}
        </Button>
      </HStack>
    </Box>
  );
};

export default MessageInput; 