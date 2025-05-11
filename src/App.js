import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  useColorModeValue,
  Grid,
  GridItem,
  Divider
} from '@chakra-ui/react';
import { MeshDevice } from "@meshtastic/core";
import { TransportHTTP } from "@meshtastic/transport-http";
import { useLanguage } from './i18n/LanguageContext.js';
import LanguageSelector from './components/ui/LanguageSelector.js';
import ThemeToggle from './components/ui/ThemeToggle.js';
import DeviceConnection from './components/ui/DeviceConnection.js';
import MessageTemplates from './components/templates/MessageTemplates.js';
import MessageInput from './components/ui/MessageInput.js';
import MessageHistory from './components/ui/MessageHistory.js';
import { MessageInbox } from './components/messages/index.js';
import './styles.css';
import { SkipLink } from './components/accessibility/index.js';

function App() {
  const { t } = useLanguage();
  const [connectionStatus, setConnectionStatus] = useState(t('disconnected'));
  const [deviceAddress, setDeviceAddress] = useState('172.19.0.2:4403'); // Default IP
  const [meshtasticDevice, setMeshtasticDevice] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Get theme-aware colors
  const bgColor = useColorModeValue('white', 'gray.900');
  const headerBgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    console.log('App component rendering...');
  }, []);

  const handleConnect = async () => {
    setConnectionStatus(t('connecting'));
    try {
      console.log('Attempting to initialize Meshtastic device...');
      const transport = await TransportHTTP.create(deviceAddress);
      const deviceInstance = new MeshDevice(transport);

      setMeshtasticDevice(deviceInstance);
      setConnectionStatus(t('connected'));
      console.log('Meshtastic device initialized:', deviceInstance);
    } catch (error) {
      console.error('Failed to initialize Meshtastic device:', error);
      setConnectionStatus(`${t('errorConnecting')}: ${error.message}`);
    }
  };

  const handleDisconnect = () => {
    if (meshtasticDevice) {
      // Add logic to disconnect if applicable
      console.log('Disconnecting meshtasticDevice...');
      // meshtasticDevice.disconnect(); // or similar method when available
      setMeshtasticDevice(null);
      setConnectionStatus(t('disconnected'));
    }
  };

  const handleSendMessage = (message) => {
    if (!meshtasticDevice) {
      alert(t('deviceNotReady'));
      return;
    }

    console.log('Sending message:', message);
    // Add logic to send message via meshtasticDevice
    // meshtasticDevice.sendMessage(message);

    // For demonstration, add message to history
    const newMessage = {
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Sent' // This would normally be dynamic based on actual send status
    };

    setMessages([newMessage, ...messages]);
    setCurrentMessage('');
  };

  const handleSelectTemplate = (template) => {
    setCurrentMessage(template);
  };

  return (
    <Box position="relative">
      {/* Add SkipLink for keyboard accessibility */}
      <SkipLink targetId="main-content" />

      <Box minH="100vh" p={4}>
        <Container maxW="container.xl" p={0}>
          <Flex
            as="header"
            align="center"
            justify="space-between"
            py={3}
            px={5}
            bg={headerBgColor}
            borderBottomWidth="1px"
            borderColor={borderColor}
          >
            <Heading size="lg" color="blue.500">{t('appTitle')}</Heading>
            <Flex align="center" gap={2}>
              <LanguageSelector />
              <ThemeToggle />
            </Flex>
          </Flex>

          <Box id="main-content" as="main" p={4} bg={bgColor} tabIndex={-1} outline="none">
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={6}
            >
              <GridItem>
                <Box
                  mb={6}
                  p={4}
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="md"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Heading as="h2" size="md" mb={4}>{t('connectionStatus')}</Heading>
                  <DeviceConnection
                    deviceAddress={deviceAddress}
                    onDeviceAddressChange={setDeviceAddress}
                    connectionStatus={connectionStatus}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                    isConnected={meshtasticDevice !== null}
                  />
                </Box>

                <Box
                  p={4}
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="md"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Heading as="h2" size="md" mb={4}>{t('messageTemplates')}</Heading>
                  <MessageTemplates onSelectTemplate={handleSelectTemplate} />
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  mb={6}
                  p={4}
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="md"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Heading as="h2" size="md" mb={4}>{t('messageInput')}</Heading>
                  <MessageInput
                    initialValue={currentMessage}
                    onSendMessage={handleSendMessage}
                  />
                </Box>

                <Box
                  p={4}
                  bg={useColorModeValue('white', 'gray.800')}
                  borderRadius="md"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <MessageHistory messages={messages} />
                </Box>
              </GridItem>
            </Grid>

            {/* New Section - Message Inbox */}
            <Box mt={10}>
              <Divider mb={8} />
              <Heading as="h2" size="lg" mb={6}>
                {t('messages')}
              </Heading>
              <Box
                p={4}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="md"
                boxShadow="sm"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <MessageInbox />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;