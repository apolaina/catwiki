import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
} from 'react-native';
import { Theme } from '@/constants/Theme';
import EncounterForm from '@/features/encounters/components/EncounterForm';
import { useEncounters } from '@/features/encounters/hooks';
import type { NewEncounter } from '@/features/encounters/types';

export default function EncounterDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const encounterId = Number(id);
	const router = useRouter();
	const {
		deleteEncounterAction,
		getEncounterById,
		isPending,
		updateEncounterAction,
	} = useEncounters();
	const [initialValues, setInitialValues] = useState<NewEncounter | null>(
		null,
	);

	useEffect(() => {
		if (!Number.isFinite(encounterId)) {
			setInitialValues(null);
			return;
		}

		const encounter = getEncounterById(encounterId);
		if (!encounter) {
			setInitialValues(null);
			return;
		}

		setInitialValues({
			date: encounter.date,
			location: encounter.location,
			breed_id: encounter.breed_id,
			notes: encounter.notes,
			photo_uri: encounter.photo_uri,
		});
	}, [encounterId, getEncounterById]);

	const title = useMemo(() => `ENCOUNTER #${encounterId}`, [encounterId]);

	if (!initialValues) {
		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				<Stack.Screen options={{ title: 'ENCOUNTER' }} />
				<Text style={styles.errorText}>Encounter not found.</Text>
			</KeyboardAvoidingView>
		);
	}

	const handleUpdate = async (values: NewEncounter) => {
		await updateEncounterAction(encounterId, values);
		router.back();
	};

	const handleDelete = async () => {
		Alert.alert('Delete note', 'This action cannot be undone.', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Delete',
				style: 'destructive',
				onPress: async () => {
					await deleteEncounterAction(encounterId);
					router.back();
				},
			},
		]);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<Stack.Screen options={{ title }} />
			<EncounterForm
				initialValues={initialValues}
				screenLabel={title}
				submitLabel="UPDATE_ENCOUNTER"
				onSubmit={handleUpdate}
				onDelete={handleDelete}
				onCancel={() => router.back()}
				isBusy={isPending}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.colors.background,
	},
	errorText: {
		marginTop: 60,
		textAlign: 'center',
		fontSize: 16,
		color: Theme.colors.text,
	},
});
