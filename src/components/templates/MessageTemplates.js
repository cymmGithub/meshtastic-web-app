import React, { useState } from 'react';
import { 
  Box, 
  Select, 
  VStack, 
  FormControl, 
  FormLabel, 
  Button, 
  Text, 
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { FiMessageSquare, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.js';
import { getCategoryTemplates, categories } from '../../utils/templateData.js';

const MessageTemplates = ({ onSelectTemplate }) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const templates = selectedCategory ? getCategoryTemplates(selectedCategory, language) : [];
  
  // Get background colors based on color mode
  const boxBgColor = useColorModeValue('gray.50', 'gray.700');

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

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel htmlFor="category-select">
          {t('selectCategory')}
        </FormLabel>
        <Select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          placeholder={t('selectCategory')}
          bg={useColorModeValue('white', 'gray.700')}
          colorScheme={getCategoryColor(selectedCategory)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {t(category)}
            </option>
          ))}
        </Select>
      </FormControl>

      {selectedCategory && (
        <Box mt={4}>
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