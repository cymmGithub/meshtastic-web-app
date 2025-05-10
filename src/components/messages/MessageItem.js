import React from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Badge, 
  Heading,
  Icon,
  Spacer,
  Button,
  useColorModeValue,
  useDisclosure,
  HStack,
  Collapse,
  IconButton,
  chakra,
  Tooltip
} from '@chakra-ui/react';
import { 
  FiAlertTriangle, 
  FiClock, 
  FiChevronDown, 
  FiChevronUp, 
  FiCheckCircle,
  FiNavigation,
  FiActivity,
  FiPackage,
  FiLayers,
  FiAlertCircle,
  FiInfo
} from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatDistanceToNow, format } from 'date-fns';
import { getPriorityColor } from '../../utils/mockMessages';

// Helper to get the appropriate icon for a category
const getCategoryIcon = (category) => {
  switch(category) {
    case 'evacuation': return FiNavigation;
    case 'medicalEmergency': return FiActivity;
    case 'resources': return FiPackage;
    case 'infrastructure': return FiLayers;
    case 'urgentHelp': return FiAlertCircle;
    default: return FiInfo;
  }
};

const MessageItem = ({ message, onAcknowledge }) => {
  const { language, t } = useLanguage();
  const { isOpen, onToggle } = useDisclosure();
  
  // Color mode values
  const boxBgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const boxHoverBg = useColorModeValue('gray.50', 'gray.650');
  const iconColor = useColorModeValue('gray.500', 'gray.400');
  
  // Format time for display
  const timeAgo = formatDistanceToNow(new Date(message.timestamp), { 
    addSuffix: true 
  });
  
  // Format expiration date
  const expirationDate = format(new Date(message.expiresAt), 'MMM dd, yyyy');
  
  // Determine if this is a critical message
  const isCritical = message.priority === 'critical';
  
  // Get the appropriate category icon
  const CategoryIcon = getCategoryIcon(message.category);
  
  return (
    <Box 
      p={0}
      borderRadius="md" 
      bg={boxBgColor}
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{
        borderColor: `${getPriorityColor(message.priority)}.400`,
        bg: boxHoverBg
      }}
      role="article"
      aria-labelledby={`message-title-${message.id}`}
    >
      {/* Message Header - Always visible */}
      <Box 
        px={4} 
        py={3}
        borderLeftWidth="4px"
        borderLeftColor={`${getPriorityColor(message.priority)}.500`}
        cursor="pointer"
        onClick={onToggle}
      >
        <Flex justify="space-between" align="flex-start">
          <Flex align="center" maxWidth="80%">
            <Icon 
              as={CategoryIcon} 
              mr={3} 
              color={`${getPriorityColor(message.priority)}.500`} 
              boxSize={5}
              aria-hidden="true"
            />
            <Heading 
              as="h3" 
              size="md" 
              id={`message-title-${message.id}`}
              isTruncated
              fontWeight="600"
            >
              {message.title[language]}
              
              {/* If acknowledgment required and not yet acknowledged */}
              {message.requiresAcknowledgment && !message.acknowledged && (
                <chakra.span ml={2} display="inline-flex" alignItems="center">
                  <Badge colorScheme="red" ml={1}>
                    {t('requiredAction')}
                  </Badge>
                </chakra.span>
              )}
            </Heading>
          </Flex>
          
          <HStack spacing={2}>
            {/* Priority badge */}
            <Badge colorScheme={getPriorityColor(message.priority)}>
              {t(message.priority)}
            </Badge>
            
            {/* Expand/collapse button */}
            <IconButton
              icon={isOpen ? <FiChevronUp /> : <FiChevronDown />}
              variant="ghost"
              size="sm"
              aria-label={isOpen ? t('collapseMessage') : t('expandMessage')}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            />
          </HStack>
        </Flex>
        
        {/* Sender information */}
        <Flex align="center" mt={1} color="gray.500" fontSize="sm">
          <Text fontWeight="medium">
            {t('from')}: {message.sender.name[language]}
          </Text>
          <Text mx={2}>•</Text>
          <Flex align="center">
            <Icon as={FiClock} mr={1} color={iconColor} aria-hidden="true" />
            <Text>{timeAgo}</Text>
          </Flex>
          
          {/* Critical message indicator */}
          {isCritical && (
            <Tooltip label={t('critical')} placement="top">
              <Flex align="center" ml={2} color="red.500">
                <Icon as={FiAlertTriangle} aria-label={t('critical')} />
              </Flex>
            </Tooltip>
          )}
        </Flex>
      </Box>
      
      {/* Message Body - Hidden until expanded */}
      <Collapse in={isOpen} animateOpacity>
        <Box 
          p={4} 
          pt={2}
          borderTop="1px solid"
          borderTopColor={borderColor}
        >
          {/* Message content */}
          <Text mb={4}>{message.content[language]}</Text>
          
          {/* Meta information */}
          <Flex 
            wrap="wrap" 
            justify="space-between" 
            align="center" 
            fontSize="sm"
            color="gray.500"
            mt={3}
            pb={2}
          >
            <HStack spacing={4} mb={{ base: 2, md: 0 }}>
              <Text>{t('expiresOn')}: {expirationDate}</Text>
              
              {message.targetAudience.includes('all-citizens') ? (
                <Text>{t('targetAudience')}: {t('allCitizens')}</Text>
              ) : (
                <Text>{t('targetAudience')}: {message.targetAudience.join(', ')}</Text>
              )}
            </HStack>
            <Spacer display={{ base: 'block', md: 'none' }} />
            
            {/* Acknowledgment button */}
            {message.requiresAcknowledgment && !message.acknowledged && (
              <Button 
                size="sm" 
                leftIcon={<Icon as={FiCheckCircle} />}
                colorScheme={isCritical ? "red" : "blue"}
                variant={isCritical ? "solid" : "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAcknowledge) onAcknowledge(message.id);
                }}
                aria-label={t('acknowledge')}
              >
                {t('acknowledge')}
              </Button>
            )}
            
            {/* Already acknowledged indicator */}
            {message.requiresAcknowledgment && message.acknowledged && (
              <HStack color="green.500">
                <Icon as={FiCheckCircle} />
                <Text fontWeight="medium">{t('acknowledged')}</Text>
              </HStack>
            )}
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};

export default MessageItem; 