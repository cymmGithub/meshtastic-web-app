import React, { useState, useRef, useEffect } from 'react';
import { 
  FormControl,
  Textarea,
  Button,
  VStack,
  Box,
  HStack,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

const MessageInput = ({ initialValue = '', onSendMessage }) => {
  const { t } = useLanguage();
  const [message, setMessage] = useState(initialValue);
  const textareaRef = useRef(null);

  // Update message when initialValue changes (from template selection)
  useEffect(() => {
    setMessage(initialValue);
    // Focus the textarea when a template is selected
    if (initialValue && initialValue !== message && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={3} align="stretch">
        <FormControl>
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('messageInput')}
            size="md"
            rows={4}
            resize="vertical"
            bg={useColorModeValue('white', 'gray.700')}
            _focus={{
              borderColor: 'blue.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
            }}
            aria-label={t('messageInput')}
          />
        </FormControl>
        
        <Box textAlign={{ base: 'stretch', sm: 'right' }}>
          <Button 
            type="submit" 
            colorScheme="blue" 
            rightIcon={<Icon as={FiSend} />}
            isDisabled={!message.trim()}
            width={{ base: '100%', sm: 'auto' }}
          >
            {t('sendButton')}
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default MessageInput; 