import React from 'react';
import { 
  Select, 
  FormControl, 
  FormLabel, 
  VisuallyHidden,
  useColorModeValue,
  Box
} from '@chakra-ui/react';
import { useLanguage } from '../../i18n/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const menuBgColor = useColorModeValue('white', 'gray.700');

  return (
    <FormControl display="flex" alignItems="center" width="auto">
      <VisuallyHidden>
        <FormLabel htmlFor="language-select">{t('selectLanguage')}</FormLabel>
      </VisuallyHidden>
      <Box position="relative">
        <Select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          size="sm"
          width="auto"
          minWidth="120px"
          bg={bgColor}
          color={useColorModeValue('gray.800', 'white')}
          borderColor={borderColor}
          borderRadius="md"
          _hover={{ borderColor: useColorModeValue('blue.300', 'blue.400') }}
          sx={{
            // Style the dropdown menu
            '& > option': {
              bg: menuBgColor,
              color: useColorModeValue('gray.800', 'white')
            }
          }}
          aria-label={t('selectLanguage')}
        >
          <option value="pl">Polski</option>
          <option value="en">English</option>
          <option value="ua">Українська</option>
          <option value="ru">Русский</option>
        </Select>
      </Box>
    </FormControl>
  );
};

export default LanguageSelector; 