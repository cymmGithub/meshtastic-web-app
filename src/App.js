import React, { useState, useEffect } from 'react';
import { MeshDevice } from "@meshtastic/core";
import { TransportHTTP } from "@meshtastic/transport-http";
import { useLanguage } from './i18n/LanguageContext';
import LanguageSelector from './components/ui/LanguageSelector';
import DeviceConnection from './components/ui/DeviceConnection';
import MessageTemplates from './components/templates/MessageTemplates';
import MessageInput from './components/ui/MessageInput';
import MessageHistory from './components/ui/MessageHistory';
import './styles.css';

function App() {
  const { t } = useLanguage();
  const [connectionStatus, setConnectionStatus] = useState(t('disconnected'));
  const [deviceAddress, setDeviceAddress] = useState('10.10.0.57'); // Default IP
  const [meshtasticDevice, setMeshtasticDevice] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

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
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">{t('appTitle')}</h1>
        <LanguageSelector />
      </header>

      <div className="main-content">
        <div className="left-column">
          <section className="section">
            <h2 className="section-title">Device Connection</h2>
            <DeviceConnection 
              deviceAddress={deviceAddress}
              onDeviceAddressChange={setDeviceAddress}
              connectionStatus={connectionStatus}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              isConnected={meshtasticDevice !== null}
            />
          </section>

          <section className="section">
            <h2 className="section-title">{t('messageTemplates')}</h2>
            <MessageTemplates onSelectTemplate={handleSelectTemplate} />
          </section>
        </div>

        <div className="right-column">
          <section className="section">
            <h2 className="section-title">{t('messageInput')}</h2>
            <MessageInput 
              initialValue={currentMessage}
              onSendMessage={handleSendMessage}
            />
          </section>

          <MessageHistory messages={messages} />
        </div>
      </div>
    </div>
  );
}

export default App;