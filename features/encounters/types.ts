export interface Encounter {
	id: number;
	date: string;
	location: string;
	breed_id: string | null;
	notes: string;
	photo_uri: string | null;
}

export type NewEncounter = Omit<Encounter, 'id'>;
