'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MeshtasticConnectComponent = () => {
	const [connected, setConnected] = useState(false);
	const [device, setDevice] = useState(null);
	const [error, setError] = useState(null);
	const [isBluetoothAvailable, setIsBluetoothAvailable] = useState(false);

	useEffect(() => {
		// Sprawdź czy Web Bluetooth API jest dostępne
		setIsBluetoothAvailable(
			typeof navigator !== 'undefined' && 'bluetooth' in navigator
		);
	}, []);

	const connectViaBluetooth = async () => {
		try {
			const device = await navigator.bluetooth.requestDevice({
				acceptAllDevices: true,
			});

			setDevice(device);
			setConnected(true);
			setError(null);

			device.addEventListener('gattserverdisconnected', () => {
				setConnected(false);
				setDevice(null);
			});
		} catch (error) {
			console.error('Failed to connect via Bluetooth:', error);
			setError(error.message);
		}
	};

	useEffect(() => {
		return () => {
			if (device) {
				device.gatt?.disconnect();
			}
		};
	}, [device]);

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
				</div>
			)}
		</div>
	);
};

// Eksportuj komponent z dynamicznym ładowaniem
export default dynamic(() => Promise.resolve(MeshtasticConnectComponent), {
	ssr: false
});
