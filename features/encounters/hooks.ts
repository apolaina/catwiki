import { useCallback, useState, useTransition } from 'react';
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

	const addEncounterAction = useCallback((newEntry: NewEncounter) => {
		return new Promise<void>((resolve) => {
			startTransition(() => {
				dbOperations.create(newEntry);
				setEncounters(dbOperations.getAll());
				resolve();
			});
		});
	}, []);

	const refreshEncountersAction = useCallback(() => {
		setEncounters(dbOperations.getAll());
	}, []);

	const getEncounterById = useCallback((id: number) => {
		return dbOperations.getById(id);
	}, []);

	const updateEncounterAction = useCallback(
		(id: number, updatedEntry: NewEncounter) => {
			return new Promise<void>((resolve) => {
				startTransition(() => {
					dbOperations.update(id, updatedEntry);
					setEncounters(dbOperations.getAll());
					resolve();
				});
			});
		},
		[],
	);

	const deleteEncounterAction = useCallback((id: number) => {
		return new Promise<void>((resolve) => {
			startTransition(() => {
				dbOperations.delete(id);
				setEncounters(dbOperations.getAll());
				resolve();
			});
		});
	}, []);

	return {
		encounters,
		addEncounterAction,
		deleteEncounterAction,
		getEncounterById,
		isPending,
		refreshEncountersAction,
		updateEncounterAction,
	};
}
