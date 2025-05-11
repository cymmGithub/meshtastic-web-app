import React from 'react';
import {
  Box,
  Flex,
  Select,
  FormControl,
  FormLabel,
  HStack,
  useColorModeValue,
  Icon,
  VisuallyHidden
} from '@chakra-ui/react';
import { FiFilter } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.js';

const MessageFilter = ({ 
  categoryFilter, 
  priorityFilter, 
  onCategoryChange, 
  onPriorityChange 
}) => {
  const { t } = useLanguage();
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box 
      p={3} 
      mb={4} 
      borderRadius="md" 
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={4}
        align={{ base: 'stretch', md: 'center' }}
      >
        <HStack spacing={2} mb={{ base: 2, md: 0 }}>
          <Icon as={FiFilter} aria-hidden="true" />
          <VisuallyHidden>Filters</VisuallyHidden>
        </HStack>
        
        <FormControl flex="1">
          <Flex direction={{ base: 'column', sm: 'row' }} gap={4}>
            <Box flex="1">
              <FormLabel 
                htmlFor="category-filter" 
                fontSize="sm" 
                mb={1}
              >
                {t('filterByCategory')}
              </FormLabel>
              <Select
                id="category-filter"
                value={categoryFilter}
                onChange={onCategoryChange}
                size="sm"
                aria-label={t('filterByCategory')}
              >
                <option value="all">{t('allMessages')}</option>
                <option value="urgentHelp">{t('urgentHelp')}</option>
                <option value="medicalEmergency">{t('medicalEmergency')}</option>
                <option value="evacuation">{t('evacuation')}</option>
                <option value="resources">{t('resources')}</option>
                <option value="infrastructure">{t('infrastructure')}</option>
              </Select>
            </Box>
            
            <Box flex="1">
              <FormLabel 
                htmlFor="priority-filter" 
                fontSize="sm" 
                mb={1}
              >
                {t('filterByPriority')}
              </FormLabel>
              <Select
                id="priority-filter"
                value={priorityFilter}
                onChange={onPriorityChange}
                size="sm"
                aria-label={t('filterByPriority')}
              >
                <option value="all">{t('allMessages')}</option>
                <option value="critical">{t('critical')}</option>
                <option value="high">{t('high')}</option>
                <option value="medium">{t('medium')}</option>
                <option value="low">{t('low')}</option>
              </Select>
            </Box>
          </Flex>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default MessageFilter; 