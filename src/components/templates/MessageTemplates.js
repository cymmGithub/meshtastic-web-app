import React, { useState } from 'react';
import { 
  Box, 
  VStack, 
  Button, 
  Text, 
  useColorModeValue,
  Icon,
  SimpleGrid,
  Heading,
  Flex,
  Badge
} from '@chakra-ui/react';
import { 
  FiMessageSquare, 
  FiChevronRight, 
  FiAlertTriangle, 
  FiHeart, 
  FiUsers, 
  FiPackage, 
  FiZap
} from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.js';
import { getCategoryTemplates, categories } from '../../utils/templateData.js';

const MessageTemplates = ({ onSelectTemplate }) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const templates = selectedCategory ? getCategoryTemplates(selectedCategory, language) : [];
  
  // Get background colors based on color mode
  const boxBgColor = useColorModeValue('gray.50', 'gray.700');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const cardHoverBgColor = useColorModeValue('gray.100', 'gray.700');

  // Category color mapping for visual differentiation (for accessibility and memorability)
  const getCategoryColor = (category) => {
    switch(category) {
      case 'urgentHelp':
        return 'red';
      case 'medicalEmergency':
        return 'orange';
      case 'evacuation':
        return 'purple';
      case 'resources':
        return 'green';
      case 'infrastructure':
        return 'blue';
      default:
        return 'gray';
    }
  };

  // Category icon mapping
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'urgentHelp':
        return FiAlertTriangle;
      case 'medicalEmergency':
        return FiHeart;
      case 'evacuation':
        return FiUsers;
      case 'resources':
        return FiPackage;
      case 'infrastructure':
        return FiZap;
      default:
        return FiMessageSquare;
    }
  };

  // Category descriptions
  const getCategoryDescription = (category) => {
    switch(category) {
      case 'urgentHelp':
        return t('urgentHelpDesc') || 'Request immediate assistance in emergency situations';
      case 'medicalEmergency':
        return t('medicalEmergencyDesc') || 'Medical assistance needed or available';
      case 'evacuation':
        return t('evacuationDesc') || 'Information about evacuation routes and procedures';
      case 'resources':
        return t('resourcesDesc') || 'Information about available resources and supplies';
      case 'infrastructure':
        return t('infrastructureDesc') || 'Updates about infrastructure status';
      default:
        return '';
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedCategory('');
  };

  return (
    <VStack spacing={4} align="stretch">
      {!selectedCategory ? (
        // Show category selection cards when no category is selected
        <>
          <Heading size="md" mb={2}>
            {t('selectCategory')}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {categories.map((category) => (
              <Box
                key={category}
                as="button"
                p={4}
                borderRadius="lg"
                boxShadow="md"
                bg={cardBgColor}
                borderLeftWidth="4px"
                borderLeftColor={`${getCategoryColor(category)}.500`}
                onClick={() => setSelectedCategory(category)}
                _hover={{
                  bg: cardHoverBgColor,
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  transition: 'all 0.2s'
                }}
                _active={{
                  transform: 'translateY(0)',
                  boxShadow: 'md'
                }}
                transition="all 0.2s"
                textAlign="left"
                height="100%"
              >
                <Flex mb={2} alignItems="center">
                  <Icon 
                    as={getCategoryIcon(category)} 
                    boxSize={6} 
                    color={`${getCategoryColor(category)}.500`} 
                    mr={2} 
                  />
                  <Heading size="sm">{t(category)}</Heading>
                </Flex>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  {getCategoryDescription(category)}
                </Text>
                <Badge colorScheme={getCategoryColor(category)} fontSize="xs">
                  {getCategoryTemplates(category, language).length} {t('templatesAvailable')}
                </Badge>
              </Box>
            ))}
          </SimpleGrid>
        </>
      ) : (
        // Show templates for selected category
        <Box>
          <Flex alignItems="center" mb={4}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackClick} 
              leftIcon={<Icon as={FiChevronRight} transform="rotate(180deg)" />}
              mr={2}
            >
              {t('back')}
            </Button>
            <Heading size="md" display="flex" alignItems="center">
              <Icon 
                as={getCategoryIcon(selectedCategory)} 
                color={`${getCategoryColor(selectedCategory)}.500`} 
                mr={2} 
              />
              {t(selectedCategory)}
            </Heading>
          </Flex>

          {templates.length > 0 ? (
            <VStack spacing={2} align="stretch">
              {templates.map((template, index) => (
                <Button
                  key={index}
                  onClick={() => onSelectTemplate(template)}
                  variant="outline"
                  colorScheme={getCategoryColor(selectedCategory)}
                  justifyContent="flex-start"
                  leftIcon={<Icon as={FiMessageSquare} />}
                  rightIcon={<Icon as={FiChevronRight} />}
                  py={3}
                  px={4}
                  height="auto"
                  textAlign="left"
                  whiteSpace="normal"
                  role="button"
                  aria-label={`Use template: ${template}`}
                >
                  <Text>{template}</Text>
                </Button>
              ))}
            </VStack>
          ) : (
            <Box 
              p={4} 
              bg={boxBgColor} 
              borderRadius="md"
              textAlign="center"
            >
              <Text>{t('noTemplatesFound')}</Text>
            </Box>
          )}
        </Box>
      )}
    </VStack>
  );
};

export default MessageTemplates; 