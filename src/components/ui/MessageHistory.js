import React from 'react';
import { 
  Box, 
  Heading, 
  VStack, 
  Text, 
  Flex, 
  Badge, 
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.js';

const MessageHistory = ({ messages }) => {
  const { t } = useLanguage();
  
  // Define color mode values at component level 
  const boxBgColor = useColorModeValue('gray.50', 'gray.800');
  const boxHoverBgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  
  if (!messages || messages.length === 0) {
    return null;
  }

  // Get status icon based on message status
  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'sent':
        return FiCheckCircle;
      case 'pending':
        return FiClock;
      default:
        return FiAlertTriangle;
    }
  };

  // Get status color based on message status
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'sent':
        return 'green';
      case 'pending':
        return 'orange';
      default:
        return 'red';
    }
  };
  
  return (
    <Box>
      <Heading as="h2" size="md" mb={4}>
        {t('messageHistory')}
      </Heading>
      <VStack 
        spacing={3} 
        align="stretch" 
        maxH="400px" 
        overflowY="auto"
        px={1}
        py={2}
        aria-label={t('messageHistory')}
        role="log"
      >
        {messages.map((message, index) => (
          <Box 
            key={index} 
            p={3} 
            borderWidth="1px" 
            borderRadius="md"
            bg={boxBgColor}
            _hover={{ bg: boxHoverBgColor }}
            transition="background 0.2s"
          >
            asdfasdf
            <Text mb={2} fontWeight="medium">
              {message.text}
            </Text>
            <Flex 
              justify="space-between" 
              fontSize="sm" 
              color={textColor}
              align="center"
            >
              <Text>{message.timestamp}</Text>
              <Badge 
                colorScheme={getStatusColor(message.status)}
                display="flex"
                alignItems="center"
                gap={1}
                px={2}
                py={1}
                borderRadius="md"
              >
                <Icon as={getStatusIcon(message.status)} />
                <Text>{message.status}</Text>
              </Badge>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default MessageHistory; 