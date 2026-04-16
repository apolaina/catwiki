import type { Breed } from './types';

const API_KEY = process.env.EXPO_PUBLIC_CAT_API_KEY;
const BASE_URL = 'https://api.thecatapi.com/v1';

export async function fetchBreeds(): Promise<Breed[]> {
	// Adding a small delay to test your Suspense skeletons if needed
	const response = await fetch(`${BASE_URL}/breeds`, {
		headers: {
			'x-api-key': API_KEY || '',
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch breeds');
	}

	return response.json();
}
