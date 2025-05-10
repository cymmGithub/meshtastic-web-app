# Meshtastic Emergency Communication App

A multilingual emergency communication application using Meshtastic devices for crisis situations. This application provides a resilient communication channel that works even in offline or limited connectivity scenarios.

## Features

- **Multilingual Support**: Available in Polish, English, Ukrainian, and Russian
- **Message Templates**: Pre-defined message templates for common emergency scenarios
- **Mesh Network**: Uses Meshtastic devices to create a mesh network for resilient communication
- **User-Friendly Interface**: Clean, accessible design for ease of use during crisis situations
- **Simulation Mode**: Built-in Meshtastic daemon for testing without physical devices

## Development

This project was built for a hackathon focused on creating resilient communication tools for crisis situations in border regions.

### Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

### Docker Development Environment

This project includes a Docker Compose setup that provides a complete development environment, including a Meshtastic daemon for simulation.

1. Start the Docker environment:
   ```
   npm run docker:start
   ```

2. Access the application at: http://localhost:3000

3. Stop the Docker environment:
   ```
   npm run docker:down
   ```

4. To view logs:
   ```
   npm run docker:logs
   ```

### Multi-Node Simulation

For testing mesh networking capabilities, you can run a multi-node simulation that includes several Meshtastic devices in a simulated network:

1. Start the multi-node simulation:
   ```
   npm run docker:multi-node
   ```

2. This creates a network with:
   - Main coordinator node (accessible at http://localhost:4403)
   - Node 1 (accessible at http://localhost:4404)
   - Node 2 (accessible at http://localhost:4405)

3. Stop the multi-node simulation:
   ```
   npm run docker:multi-node:down
   ```

4. Configuration for each node is stored in the `configs/` directory:
   - `configs/main-node.yaml` - Main coordinator node
   - `configs/node1.yaml` - First client node
   - `configs/node2.yaml` - Second client node

### Meshtastic Daemon Simulation

The Docker setup includes a Meshtastic daemon (`meshtasticd`) that simulates a Meshtastic device. This allows you to develop and test without physical hardware.

- The daemon is accessible at `http://localhost:4403`
- Configuration is stored in `meshtastic-config.yaml` (single node) or in the `configs/` directory (multi-node)
- Data persistence is handled through Docker volumes

## Project Structure

- `src/components/` - UI and template components
- `src/i18n/` - Internationalization files
- `src/utils/` - Utility functions and data
  - `meshtasticClient.js` - Client for connecting to Meshtastic devices

## Usage

1. Connect to a Meshtastic device:
   - Physical device via IP address
   - Or use the built-in simulation (pre-configured in Docker)
2. Select message templates or compose custom messages
3. Send messages through the mesh network

## Hardware Requirements

- Meshtastic-compatible device with HTTP connectivity (for physical deployment)
- Docker and Docker Compose (for development with simulation)