import React from 'react';
import { Box } from '@chakra-ui/react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * SkipLink component for keyboard accessibility
 * Allows users to skip to main content using keyboard navigation
 */
const SkipLink = ({ targetId = 'main-content' }) => {
  const { t } = useLanguage();
  
  return (
    <Box
      as="a"
      href={`#${targetId}`}
      position="absolute"
      top="-40px"
      left="0"
      p="8px"
      bg="blue.500"
      color="white"
      zIndex="1000"
      transition="top 0.2s"
      borderRadius="sm"
      fontWeight="medium"
      _focus={{
        top: "8px",
        left: "8px",
        outline: "none",
        boxShadow: "outline"
      }}
    >
      {t('skipToContent')}
    </Box>
  );
};

export default SkipLink; 