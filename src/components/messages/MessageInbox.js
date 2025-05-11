import React, { useState, useEffect } from 'react';
import { 
  Box, 
  VStack, 
  Heading, 
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  SkeletonText,
  Button,
  Icon,
  Container
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.js';
import { mockMessages } from '../../utils/mockMessages.js';
import MessageItem from './MessageItem.js';
import MessageFilter from './MessageFilter.js';

const MessageInbox = () => {
  const { t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [messages, setMessages] = useState(mockMessages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Color mode values - defined at the component level, not inside conditionals or callbacks
  const boxBgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Simulating data loading
  useEffect(() => {
    // In a real app, this would be an API call to fetch messages
    const fetchData = async () => {
      try {
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(mockMessages);
        setLoading(false);
      } catch (err) {
        setError('Error loading messages');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle message acknowledgment
  const handleAcknowledge = (messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, acknowledged: true } : msg
      )
    );
  };
  
  // Filter messages based on selected filters
  const filteredMessages = messages.filter(msg => {
    const matchesCategory = categoryFilter === 'all' || msg.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || msg.priority === priorityFilter;
    return matchesCategory && matchesPriority;
  });
  
  // Sort messages by priority and timestamp
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    // First by priority level
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by timestamp (newest first)
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  
  // Get critical unacknowledged messages for the alert
  const criticalUnacknowledged = messages.filter(
    msg => msg.priority === 'critical' && msg.requiresAcknowledgment && !msg.acknowledged
  );
  
  return (
    <Container maxW="container.lg" px={{ base: 2, md: 4 }}>
      <Box py={4}>
        <Heading as="h1" size="lg" mb={6}>
          {t('messagesInbox')}
        </Heading>
        
        {/* Critical messages alert */}
        {criticalUnacknowledged.length > 0 && (
          <Alert 
            status="error" 
            variant="solid" 
            borderRadius="md" 
            mb={4}
            flexDirection={{ base: "column", sm: "row" }}
            alignItems={{ base: "flex-start", sm: "center" }}
          >
            <AlertIcon boxSize={5} />
            <AlertTitle mr={2}>{criticalUnacknowledged.length} {t('critical')} {criticalUnacknowledged.length === 1 ? t('message') : t('messages')}</AlertTitle>
            <AlertDescription>
              {t('requiresYourAttention')}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Message filters */}
        <MessageFilter 
          categoryFilter={categoryFilter}
          priorityFilter={priorityFilter}
          onCategoryChange={(e) => setCategoryFilter(e.target.value)}
          onPriorityChange={(e) => setPriorityFilter(e.target.value)}
        />
        
        {/* Error state */}
        {error && (
          <Alert status="error" borderRadius="md" mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>{t('errorOccurred')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {/* Loading state */}
        {loading ? (
          <VStack spacing={4} align="stretch">
            {[1, 2, 3].map(i => (
              <Box 
                key={i} 
                p={5} 
                borderRadius="md" 
                bg={cardBgColor}
                borderWidth="1px"
                borderColor={cardBorderColor}
              >
                <SkeletonText mt="2" noOfLines={4} spacing="4" />
              </Box>
            ))}
          </VStack>
        ) : (
          <>
            {sortedMessages.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {sortedMessages.map(message => (
                  <MessageItem 
                    key={message.id} 
                    message={message}
                    onAcknowledge={handleAcknowledge}
                  />
                ))}
              </VStack>
            ) : (
              <Box 
                p={8} 
                borderRadius="md" 
                bg={boxBgColor} 
                textAlign="center"
                borderWidth="1px"
                borderColor={cardBorderColor}
                borderStyle="dashed"
              >
                <Icon as={FiMoreHorizontal} boxSize={10} color="gray.400" mb={4} />
                <Text fontSize="lg" fontWeight="medium">{t('noMessages')}</Text>
                {categoryFilter !== 'all' || priorityFilter !== 'all' ? (
                  <Text mt={2} color="gray.500">
                    {t('tryDifferentFilters')}
                  </Text>
                ) : null}
                {(categoryFilter !== 'all' || priorityFilter !== 'all') && (
                  <Button
                    mt={4}
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setCategoryFilter('all');
                      setPriorityFilter('all');
                    }}
                  >
                    {t('clearFilters')}
                  </Button>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default MessageInbox; 