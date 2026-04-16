export interface Breed {
	id: string;
	name: string;
	description: string;
	temperament: string;
	origin: string;
	life_span: string;
	adaptability: number;
	energy_level: number;
	image?: {
		url: string;
	};
}
