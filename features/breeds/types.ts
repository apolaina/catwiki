export interface Breed {
	id: string;
	name: string;
	affection_level: number;
	description: string;
	temperament: string;
	origin: string;
	life_span: string;
	adaptability: number;
	energy_level: number;
	reference_image_id: string;
	image?: {
		url: string;
	};
}
