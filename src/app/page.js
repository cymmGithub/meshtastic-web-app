import MeshtasticConnect from './components/MeshtasticConnect';

export default function Home() {
	return (
		<main className='min-h-screen p-8'>
			<h1 className='text-3xl font-bold mb-8'>Meshtastic Web App</h1>
			<MeshtasticConnect />
		</main>
	);
}
