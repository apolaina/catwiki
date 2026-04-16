import * as SQLite from 'expo-sqlite';
import type { Encounter, NewEncounter } from './types';

export const db = SQLite.openDatabaseSync('catwiki.db');

// Execute this IMMEDIATELY to ensure the table exists before any components render
db.execSync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS encounters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    location TEXT,
    breed_id TEXT,
    notes TEXT,
    photo_uri TEXT
  );
`);

export const dbOperations = {
	getAll: (): Encounter[] => {
		try {
			return db.getAllSync<Encounter>(
				'SELECT * FROM encounters ORDER BY date DESC',
			);
		} catch (e) {
			console.error('Failed to fetch encounters', e);
			return [];
		}
	},

	create: (item: NewEncounter) => {
		return db.runSync(
			'INSERT INTO encounters (date, location, breed_id, notes, photo_uri) VALUES (?, ?, ?, ?, ?)',
			[item.date, item.location, item.breed_id, item.notes, item.photo_uri],
		);
	},
};
