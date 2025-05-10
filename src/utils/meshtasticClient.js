import * as meshtastic from '@meshtastic/core';
import { HttpTransport } from '@meshtastic/transport-http';

// Get environment variables or use defaults
const MESHTASTIC_HTTP_HOST = process.env.MESHTASTIC_HTTP_HOST || 'localhost';
const MESHTASTIC_HTTP_PORT = process.env.MESHTASTIC_HTTP_PORT || '4403';

let client = null;
let transport = null;

/**
 * Initialize and connect to the Meshtastic daemon via HTTP
 * @returns {Promise<Client>} A connected Meshtastic client
 */
export const connectToMeshtastic = async () => {
  if (client) {
    return client;
  }

  try {
    // Create HTTP transport to connect to meshtasticd
    transport = new HttpTransport({
      host: MESHTASTIC_HTTP_HOST,
      port: Number(MESHTASTIC_HTTP_PORT),
      autoConnectDisconnect: true,
    });

    // Create client with the transport
    client = new meshtastic.Client(transport);

    // Connect to the device
    await client.connect();
    console.log('Connected to Meshtastic device via HTTP');

    // Set up event listeners
    client.subscribe('node', (node) => {
      console.log(`Node update:`, node);
    });

    client.subscribe('packet', (packet) => {
      console.log(`Received packet:`, packet);
    });

    return client;
  } catch (error) {
    console.error('Failed to connect to Meshtastic device:', error);
    throw error;
  }
};

/**
 * Disconnect from the Meshtastic device
 */
export const disconnectFromMeshtastic = async () => {
  try {
    if (client) {
      await client.disconnect();
      console.log('Disconnected from Meshtastic device');
      client = null;
      transport = null;
    }
  } catch (error) {
    console.error('Error disconnecting from Meshtastic device:', error);
  }
};

/**
 * Send a text message to a specific node or broadcast
 * @param {string} text - The message text
 * @param {number} [destinationId] - The destination node ID, or undefined for broadcast
 * @returns {Promise<void>}
 */
export const sendTextMessage = async (text, destinationId) => {
  if (!client) {
    await connectToMeshtastic();
  }

  try {
    await client.sendText(text, {
      destinationId,
      channel: 0, // Default channel
      wantAck: true,
    });
    console.log(`Message sent: ${text}`);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Get all known nodes in the mesh network
 * @returns {Array} Array of node objects
 */
export const getNodes = async () => {
  if (!client) {
    await connectToMeshtastic();
  }

  try {
    return Object.values(client.nodes);
  } catch (error) {
    console.error('Error getting nodes:', error);
    return [];
  }
};

export default {
  connectToMeshtastic,
  disconnectFromMeshtastic,
  sendTextMessage,
  getNodes,
};