# Meshtastic Emergency Communication App

A multilingual emergency communication application using Meshtastic devices for crisis situations. This application provides a resilient communication channel that works even in offline or limited connectivity scenarios.

## Features

- **Multilingual Support**: Available in Polish, English, Ukrainian, and Russian
- **Message Templates**: Pre-defined message templates for common emergency scenarios
- **Mesh Network**: Uses Meshtastic devices to create a mesh network for resilient communication
- **User-Friendly Interface**: Clean, accessible design for ease of use during crisis situations

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

## Project Structure

- `src/components/` - UI and template components
- `src/i18n/` - Internationalization files
- `src/utils/` - Utility functions and data

## Usage

1. Enter the IP address of your Meshtastic device
2. Connect to the device
3. Select message templates or compose custom messages
4. Send messages through the mesh network

## Hardware Requirements

- Meshtastic-compatible device with HTTP connectivity 