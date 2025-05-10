import React from 'react';
import { 
  IconButton, 
  useColorMode, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem,
  Tooltip,
  Icon
} from '@chakra-ui/react';
import { useLanguage } from '../../i18n/LanguageContext';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ThemeToggle = () => {
  const { colorMode, setColorMode } = useColorMode();
  const { t } = useLanguage();

  const getColorModeIcon = () => {
    switch (colorMode) {
      case 'light':
        return <Icon as={FiSun} />;
      case 'dark':
        return <Icon as={FiMoon} />;
      default:
        return <Icon as={FiMonitor} />;
    }
  };

  return (
    <Menu closeOnSelect={true}>
      <Tooltip
        label={t('changeColorMode')}
        aria-label={t('changeColorMode')}
        openDelay={500}
      >
        <MenuButton
          as={IconButton}
          aria-label={t('changeColorMode')}
          icon={getColorModeIcon()}
          variant="ghost"
          size="md"
        />
      </Tooltip>
      <MenuList>
        <MenuItem 
          icon={<FiSun />} 
          onClick={() => setColorMode('light')}
          aria-current={colorMode === 'light' ? 'page' : undefined}
        >
          {t('lightMode')}
        </MenuItem>
        <MenuItem 
          icon={<FiMoon />} 
          onClick={() => setColorMode('dark')}
          aria-current={colorMode === 'dark' ? 'page' : undefined}
        >
          {t('darkMode')}
        </MenuItem>
        <MenuItem 
          icon={<FiMonitor />} 
          onClick={() => setColorMode('system')}
          aria-current={colorMode === 'system' ? 'page' : undefined}
        >
          {t('systemMode')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ThemeToggle; 