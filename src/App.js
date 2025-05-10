import React, { useState, useEffect } from 'react';
import { MeshDevice } from "@meshtastic/core";
import { TransportHTTP } from "@meshtastic/transport-http";

function App() {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [deviceAddress, setDeviceAddress] = useState('10.10.0.57'); // Use the IP here or make it configurable
  const [meshtasticDevice, setMeshtasticDevice] = useState(null);
  const [connection, setConnection] = useState(null); // This state seems to be for a different connection object later.
  console.log('App component rendering...'); // A log to check if App starts rendering

  useEffect(() => {
    console.log('Attempting to initialize Meshtastic device...');
    const initializeDevice = async () => {
      try {
        const transport = await TransportHTTP.create(deviceAddress); // Using deviceAddress state
        const deviceInstance = new MeshDevice(transport);
        setMeshtasticDevice(deviceInstance);
        console.log('Meshtastic device initialized:', deviceInstance);
        // You might want to set connection status or do other things here
      } catch (error) {
        console.error('Failed to initialize Meshtastic device:', error);
        setConnectionStatus(`Error initializing: ${error.message}`);
      }
    };

    initializeDevice();

    // Optional: Cleanup if necessary when the component unmounts
    // return () => {
    //   if (meshtasticDevice && meshtasticDevice.transport) {
    //     // Assuming there's a way to close/disconnect the transport
    //     // meshtasticDevice.transport.close();
    //   }
    // };
  }, [deviceAddress]); // Re-run if deviceAddress changes, though likely it's fixed initially

  const handleConnect = () => {
    if (meshtasticDevice) {
      console.log('Trying to connect with meshtasticDevice:', meshtasticDevice);
      // Add logic to connect if your meshtasticDevice object has a connect method
      // or if connection is implicit after initialization.
      // The original handleConnect logic was using 'connection.connect({...})' which seems
      // to be from a different library or a part of the code not fully shown/integrated.
      setConnectionStatus('Connected (device initialized)');
    } else {
      console.log('Meshtastic device not initialized yet.');
      setConnectionStatus('Device not ready');
    }
  };

  const handleDisconnect = () => {
    if (meshtasticDevice) {
      // Add logic to disconnect if applicable
      console.log('Disconnecting meshtasticDevice...');
      // meshtasticDevice.disconnect(); // or similar
      setConnectionStatus('Disconnected');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Meshtastic Web Starter App (HTTP Connection)</h1>
      <div>
        <label htmlFor="deviceAddress">Device IP Address: </label>
        <input
          type="text"
          id="deviceAddress"
          value={deviceAddress}
          onChange={(e) => setDeviceAddress(e.target.value)}
          placeholder="e.g., 192.168.1.100"
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        {!meshtasticDevice ? (
          <button onClick={handleConnect} disabled={connectionStatus === 'Connecting...'}>
            {connectionStatus === 'Connecting...' ? 'Connecting...' : 'Connect to Meshtastic Device'}
          </button>
        ) : (
          <button onClick={handleDisconnect}>Disconnect</button>
        )}
      </div>
      <p style={{ marginTop: '10px' }}>Status: {connectionStatus}</p>
      <p>
        <small>
          Ensure your Meshtastic device is reachable at the specified IP address and has its HTTP server enabled.
        </small>
      </p>
    </div>
  );
}

export default App;