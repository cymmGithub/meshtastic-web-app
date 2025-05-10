'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MeshDevice } from '@meshtastic/core';
import { WebBluetoothTransport } from '@meshtastic/transport-web-bluetooth';

const MeshtasticConnectComponent = () => {
	const [client, setClient] = useState(null);
	const [connected, setConnected] = useState(false);
	const [device, setDevice] = useState(null);
	const [error, setError] = useState(null);
	const [nodes, setNodes] = useState([]);
	const [isBluetoothAvailable, setIsBluetoothAvailable] = useState(false);

	useEffect(() => {
		// Sprawdź czy Web Bluetooth API jest dostępne
		setIsBluetoothAvailable(
			typeof navigator !== 'undefined' && 'bluetooth' in navigator
		);
	}, []);

	const connectViaBluetooth = async () => {
		try {
			const transport = new WebBluetoothTransport();
			await transport.open();

			const client = new MeshDevice(transport);
			await client.connect();
			
			setClient(client);
			setDevice(transport.device);
			setConnected(true);
			setError(null);

			// Nasłuchuj na zmiany w liście węzłów
			client.onNodeListChanged.subscribe((nodeList) => {
				setNodes(Object.values(nodeList));
			});

			// Nasłuchuj na wiadomości
			client.onMessage.subscribe((message) => {
				console.log('Otrzymano wiadomość:', message);
			});

			// Nasłuchuj na rozłączenie
			transport.onDisconnected.subscribe(() => {
				setConnected(false);
				setClient(null);
				setDevice(null);
			});
		} catch (error) {
			console.error('Błąd połączenia Bluetooth:', error);
			setError(error.message);
		}
	};

	const sendMessage = async (text) => {
		if (!client) return;
		try {
			await client.sendText(text);
		} catch (error) {
			console.error('Błąd wysyłania wiadomości:', error);
			setError(error.message);
		}
	};

	useEffect(() => {
		return () => {
			if (client) {
				client.disconnect();
			}
		};
	}, [client]);

	if (!isBluetoothAvailable) {
		return (
			<div className='container mx-auto p-4'>
				<h1 className='text-2xl font-bold mb-4'>Meshtastic Connection</h1>
				<p className='text-red-500'>
					Web Bluetooth API nie jest dostępne w Twojej przeglądarce.
				</p>
			</div>
		);
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Meshtastic Connection</h1>

			{!connected ? (
				<div className='space-x-4'>
					<button
						onClick={connectViaBluetooth}
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
					>
						Connect via Bluetooth
					</button>
					{error && (
						<p className='text-red-500 mt-2'>{error}</p>
					)}
				</div>
			) : (
				<div>
					<p className='text-green-600 font-semibold'>
						Connected to device: {device?.name || 'Unknown'}
					</p>
					
					<div className='mt-4'>
						<h2 className='text-xl font-bold mb-2'>Nodes:</h2>
						<ul className='list-disc pl-5'>
							{nodes.length > 0 ? (
								nodes.map((node) => (
									<li key={node.num} className='mb-1'>
										{node.user?.longName || 'Unknown'} ({node.num})
									</li>
								))
							) : (
								<li>No nodes found yet</li>
							)}
						</ul>
					</div>

					<div className='mt-4'>
						<h2 className='text-xl font-bold mb-2'>Send Message</h2>
						<div className='flex gap-2'>
							<input
								type="text"
								placeholder="Type your message..."
								className='flex-1 p-2 border rounded'
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										sendMessage(e.target.value);
										e.target.value = '';
									}
								}}
							/>
							<button
								onClick={() => {
									const input = document.querySelector('input');
									if (input) {
										sendMessage(input.value);
										input.value = '';
									}
								}}
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							>
								Send
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// Eksportuj komponent z dynamicznym ładowaniem
export default dynamic(() => Promise.resolve(MeshtasticConnectComponent), {
	ssr: false
});
