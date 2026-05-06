import { useState, useTransition } from 'react';
import { dbOperations } from './db';
import type { Encounter, NewEncounter } from './types';

export function useEncounters() {
	const [isPending, startTransition] = useTransition();
	// Initialize with an empty array if the DB isn't ready yet
	const [encounters, setEncounters] = useState<Encounter[]>(() => {
		try {
			return dbOperations.getAll();
		} catch {
			return [];
		}
	});

	const addEncounterAction = (newEntry: NewEncounter) => {
		return new Promise<void>((resolve) => {
			startTransition(() => {
				dbOperations.create(newEntry);
				const updated = dbOperations.getAll();
				setEncounters(updated);
				resolve();
			});
		});
	};

	const deleteEncounterAction = (id: number) => {
		return new Promise<void>((resolve) => {
			startTransition(() => {
				dbOperations.delete(id);
				const updated = dbOperations.getAll();
				setEncounters(updated);
				resolve();
			});
		});
	};

	return { encounters, addEncounterAction, deleteEncounterAction, isPending };
}
