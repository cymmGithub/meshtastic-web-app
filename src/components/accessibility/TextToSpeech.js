import React from 'react';
import { IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { FiVolume2 } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * TextToSpeech component for accessibility
 * Uses the Web Speech API to read text aloud
 */
const TextToSpeech = ({ text, language }) => {
  const { t, language: contextLanguage } = useLanguage();
  const toast = useToast();
  
  // Map language codes to speech synthesis voices
  const languageMap = {
    en: 'en-US',
    pl: 'pl-PL',
    ua: 'uk-UA', // Ukrainian
    ru: 'ru-RU'
  };
  
  // Use the language prop if provided, otherwise use the language from context
  const speechLanguage = language || languageMap[contextLanguage] || 'en-US';
  
  const speak = () => {
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
      // Create a new speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLanguage;
      
      // Set a fallback voice if needed
      const voices = window.speechSynthesis.getVoices();
      const availableVoice = voices.find(voice => voice.lang.includes(speechLanguage.split('-')[0]));
      if (availableVoice) {
        utterance.voice = availableVoice;
      }
      
      // Speak the text
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    } else {
      // Show an error toast if speech synthesis is not supported
      toast({
        title: t('speechNotSupported'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Tooltip label={t('readAloud')} hasArrow placement="top">
      <IconButton
        icon={<FiVolume2 />}
        onClick={speak}
        aria-label={t('readAloud')}
        size="sm"
        variant="ghost"
        ml={2}
      />
    </Tooltip>
  );
};

export default TextToSpeech; 