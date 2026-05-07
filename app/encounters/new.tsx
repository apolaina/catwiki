import { Stack, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Theme } from '@/constants/Theme';
import EncounterForm from '@/features/encounters/components/EncounterForm';
import { useEncounters } from '@/features/encounters/hooks';

export default function NewEncounterScreen() {
	const router = useRouter();
	const { addEncounterAction, isPending } = useEncounters();

	const handleSave = async (values: {
		date: string;
		location: string;
		breed_id: string | null;
		notes: string;
		photo_uri: string | null;
	}) => {
		await addEncounterAction({
			...values,
		});

		router.back();
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<Stack.Screen options={{ title: 'NEW ENCOUNTER' }} />
			<EncounterForm
				initialValues={{
					date: new Date().toISOString().slice(0, 10),
					location: '',
					breed_id: null,
					notes: '',
					photo_uri: null,
				}}
				screenLabel="NEW_ENTRY / 2026"
				submitLabel="SAVE_ENCOUNTER"
				onSubmit={handleSave}
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
});
