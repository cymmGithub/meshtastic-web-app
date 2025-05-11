import React, { useState, useEffect } from 'react';
import { Button, useToast, Icon } from '@chakra-ui/react';
import { FiMic, FiMicOff } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.js';

/**
 * SpeechRecognition component for accessibility
 * Allows users to input text using their voice
 */
const SpeechRecognition = ({ onTranscript, placeholder }) => {
  const { t, language } = useLanguage();
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const toast = useToast();

  // Map language codes to speech recognition language codes
  const languageMap = {
    en: 'en-US',
    pl: 'pl-PL',
    ua: 'uk-UA', // Ukrainian
    ru: 'ru-RU'
  };

  useEffect(() => {
    // Check if the browser supports speech recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionAPI();
      
      // Configure the recognition instance
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = languageMap[language] || 'en-US';
      
      // Handle recognition results
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onTranscript) {
          onTranscript(transcript);
        }
        setListening(false);
      };
      
      // Handle errors
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setListening(false);
        toast({
          title: t('speechRecognitionError'),
          description: event.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      };
      
      // Handle when recognition ends
      recognitionInstance.onend = () => {
        setListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
    
    // Cleanup
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, onTranscript, toast, t]); // Excluding languageMap and recognition due to dependency cycle

  const toggleListening = () => {
    if (listening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
        setListening(true);
      } catch (error) {
        console.error('Speech recognition start error', error);
        toast({
          title: t('speechRecognitionError'),
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  if (!recognition) {
    return null; // Don't render anything if speech recognition is not supported
  }

  return (
    <Button
      leftIcon={listening ? <Icon as={FiMicOff} /> : <Icon as={FiMic} />}
      onClick={toggleListening}
      colorScheme={listening ? "red" : "blue"}
      size="md"
      aria-label={listening ? t('stopListening') : t('startListening')}
      isLoading={listening}
      loadingText={t('listening')}
      variant={listening ? "solid" : "outline"}
      width="auto"
    >
      {listening ? t('listening') : placeholder || t('speakNow')}
    </Button>
  );
};

export default SpeechRecognition; 