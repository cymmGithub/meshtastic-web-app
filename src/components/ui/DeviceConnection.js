import React from 'react';
import { 
  Box, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Flex, 
  Text, 
  VStack,
  Badge,
  useColorModeValue,
  HStack,
  Tooltip,
  InputGroup,
  InputLeftAddon,
  Icon
} from '@chakra-ui/react';
import { FiWifi, FiWifiOff, FiAlertCircle } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';

const DeviceConnection = ({ 
  deviceAddress, 
  onDeviceAddressChange, 
  connectionStatus, 
  onConnect, 
  onDisconnect,
  isConnected
}) => {
  const { t } = useLanguage();
  
  // Status color mapping
  const getStatusColor = () => {
    switch(connectionStatus.toLowerCase()) {
      case t('connected').toLowerCase():
        return 'green';
      case t('connecting').toLowerCase():
        return 'orange';
      case t('disconnected').toLowerCase():
        return 'gray';
      default:
        return 'red'; // Error states
    }
  };

  // Status icon mapping
  const getStatusIcon = () => {
    switch(connectionStatus.toLowerCase()) {
      case t('connected').toLowerCase():
        return FiWifi;
      case t('connecting').toLowerCase():
        return FiWifi;
      case t('disconnected').toLowerCase():
        return FiWifiOff;
      default:
        return FiAlertCircle; // Error states
    }
  };
  
  return (
    <VStack spacing={4} align="stretch" width="100%">
      <FormControl>
        <FormLabel htmlFor="deviceAddress" fontWeight="medium">
          {t('deviceAddress')}
        </FormLabel>
        <InputGroup>
          <InputLeftAddon>IP</InputLeftAddon>
          <Input
            id="deviceAddress"
            value={deviceAddress}
            onChange={(e) => onDeviceAddressChange(e.target.value)}
            placeholder="e.g., 192.168.1.100"
            type="text"
            pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
            aria-describedby="device-address-hint"
            isInvalid={!deviceAddress}
          />
        </InputGroup>
      </FormControl>
      
      <Flex 
        direction={{ base: 'column', sm: 'row' }} 
        justify="space-between"
        align={{ base: 'stretch', sm: 'center' }}
        gap={3}
      >
        <HStack spacing={2}>
          <Text fontWeight="medium">{t('connectionStatus')}:</Text>
          <Badge 
            colorScheme={getStatusColor()} 
            px={2} 
            py={1} 
            borderRadius="md"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Icon as={getStatusIcon()} />
            <Text>{connectionStatus}</Text>
          </Badge>
        </HStack>
        
        {!isConnected ? (
          <Button 
            onClick={onConnect} 
            isLoading={connectionStatus === t('connecting')}
            loadingText={t('connecting')}
            colorScheme="blue"
            leftIcon={<Icon as={FiWifi} />}
            isDisabled={!deviceAddress}
            width={{ base: '100%', sm: 'auto' }}
          >
            {t('connectButton')}
          </Button>
        ) : (
          <Button 
            onClick={onDisconnect}
            colorScheme="red"
            leftIcon={<Icon as={FiWifiOff} />}
            width={{ base: '100%', sm: 'auto' }}
          >
            {t('disconnectButton')}
          </Button>
        )}
      </Flex>
      
      <Text 
        fontSize="sm" 
        color={useColorModeValue("gray.600", "gray.400")}
        id="device-address-hint"
      >
        {t('ensureDeviceReachable')}
      </Text>
    </VStack>
  );
};

export default DeviceConnection; 