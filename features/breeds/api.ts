import type { Breed } from './types';

const API_KEY = process.env.EXPO_PUBLIC_CAT_API_KEY;
const BASE_URL = 'https://api.thecatapi.com/v1';

export interface BreedOption {
	id: string | null;
	name: string;
}

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

	const breeds: Array<Breed> = await response.json();

	// Fetch missing images via reference_image_id
	return Promise.all(
		breeds.map(async (breed) => {
			if (!breed.image && breed.reference_image_id) {
				try {
					const imageResponse = await fetch(
						`${BASE_URL}/images/${breed.reference_image_id}`,
						{
							headers: {
								'x-api-key': API_KEY || '',
							},
						},
					);

					if (imageResponse.ok) {
						const imageData = await imageResponse.json();
						return {
							...breed,
							image: {
								url: imageData.url,
							},
						};
					}
				} catch (e) {
					console.error(
						`Failed to fetch image for breed ${breed.id}`,
						e,
					);
				}
			}
			return breed;
		}),
	);
}

export async function fetchBreedOptions(): Promise<BreedOption[]> {
	const response = await fetch(`${BASE_URL}/breeds`, {
		headers: {
			'x-api-key': API_KEY || '',
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch breed options');
	}

	const breeds: Array<Pick<Breed, 'id' | 'name'>> = await response.json();

	return [
		{ id: null, name: 'Chat de gouttiere' },
		...breeds
			.map((breed) => ({ id: breed.id, name: breed.name }))
			.sort((a, b) => a.name.localeCompare(b.name)),
	];
}
