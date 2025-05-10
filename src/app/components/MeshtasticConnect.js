'use client';

import { useState, useEffect } from 'react';
import { Client } from '@meshtastic/core';
import { WebSerialTransport } from '@meshtastic/transport-web-serial';
import { WebBluetoothTransport } from '@meshtastic/transport-web-bluetooth';

export default function MeshtasticConnect() {
	const [client, setClient] = useState(null);
	const [connected, setConnected] = useState(false);
	const [nodes, setNodes] = useState([]);

	const connectViaSerial = async () => {
		try {
			const transport = new WebSerialTransport();
			await transport.open();

			const client = new Client(transport);
			await client.connect();
			setClient(client);
			setConnected(true);

			// Listen for node updates
			client.onNodeListChanged.subscribe((nodeList) => {
				setNodes(Object.values(nodeList));
			});
		} catch (error) {
			console.error('Failed to connect via Serial:', error);
		}
	};

	const connectViaBluetooth = async () => {
		try {
			const transport = new WebBluetoothTransport();
			await transport.open();

			const client = new Client(transport);
			await client.connect();
			setClient(client);
			setConnected(true);

			// Listen for node updates
			client.onNodeListChanged.subscribe((nodeList) => {
				setNodes(Object.values(nodeList));
			});
		} catch (error) {
			console.error('Failed to connect via Bluetooth:', error);
		}
	};

	useEffect(() => {
		return () => {
			if (client) {
				client.disconnect();
			}
		};
	}, [client]);

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Meshtastic Connection</h1>

			{!connected ? (
				<div className='space-x-4'>
					<button
						onClick={connectViaSerial}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						Connect via Serial
					</button>
					<button
						onClick={connectViaBluetooth}
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
					>
						Connect via Bluetooth
					</button>
				</div>
			) : (
				<div>
					<p className='text-green-600 font-semibold'>
						Connected to Meshtastic device!
					</p>
					<h2 className='text-xl font-bold mt-4 mb-2'>Nodes:</h2>
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
			)}
		</div>
	);
}
