import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { Theme } from '@/constants/Theme';
import { useEncounters } from '@/features/encounters/hooks';

export default function NewEncounterScreen() {
	const router = useRouter();
	const { addEncounterAction, isPending } = useEncounters();
	const [notes, setNotes] = useState('');
	const [location, setLocation] = useState('');

	const handleSave = async () => {
		if (!notes.trim()) return;

		await addEncounterAction({
			date: new Date().toLocaleDateString(),
			location: location.toUpperCase() || 'STREET_FIND',
			notes: notes.trim(),
			breed_id: null,
			photo_uri: null,
		});

		router.back();
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.content}>
				<Text style={styles.label}>NEW_ENTRY / 2026</Text>

				{/* Location Input */}
				<TextInput
					style={styles.inputSmall}
					placeholder="LOCATION (E.G. GARDEN)"
					placeholderTextColor="#999"
					value={location}
					onChangeText={setLocation}
					autoCapitalize="characters"
				/>

				{/* Notes Input */}
				<TextInput
					style={styles.inputLarge}
					placeholder="DESCRIBE THE CONNECTION..."
					placeholderTextColor="#999"
					multiline
					numberOfLines={6}
					value={notes}
					onChangeText={setNotes}
				/>

				<View style={styles.actions}>
					<Pressable
						style={[styles.button, isPending && { opacity: 0.7 }]}
						onPress={handleSave}
						disabled={isPending}
					>
						<Text style={styles.buttonText}>SAVE_TO_MEMORY</Text>
					</Pressable>

					<Pressable style={styles.cancelButton} onPress={() => router.back()}>
						<Text style={styles.cancelText}>DISCARD_CHANGES</Text>
					</Pressable>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.colors.background,
	},
	content: {
		padding: Theme.neobrutalism.spacing,
		paddingTop: 60,
	},
	label: {
		fontSize: 11,
		fontWeight: Theme.typography.fontWeightBold,
		letterSpacing: Theme.typography.letterSpacingWide,
		marginBottom: 32,
		color: Theme.colors.primary,
		textTransform: 'uppercase',
	},
	inputSmall: {
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 16,
		fontSize: 15,
		fontWeight: Theme.typography.fontWeightBold,
		backgroundColor: Theme.colors.surface,
		marginBottom: 20,
		letterSpacing: Theme.typography.letterSpacingNormal,
		color: Theme.colors.text,
		borderRadius: Theme.neobrutalism.borderRadius,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: 0.2,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	},
	inputLarge: {
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 20,
		fontSize: 16,
		fontWeight: Theme.typography.fontWeightLight,
		minHeight: 180,
		textAlignVertical: 'top',
		backgroundColor: Theme.colors.surface,
		marginBottom: 32,
		color: Theme.colors.text,
		lineHeight: 24,
		borderRadius: Theme.neobrutalism.borderRadius,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: 0.2,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	},
	actions: {
		gap: 16,
	},
	button: {
		backgroundColor: Theme.colors.primary,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 18,
		alignItems: 'center',
		borderRadius: Theme.neobrutalism.borderRadius,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
		elevation: 0,
	},
	buttonText: {
		color: Theme.colors.surface,
		fontWeight: Theme.typography.fontWeightBold,
		fontSize: 15,
		letterSpacing: Theme.typography.letterSpacingWide,
		textTransform: 'uppercase',
	},
	cancelButton: {
		padding: 16,
		alignItems: 'center',
	},
	cancelText: {
		fontSize: 13,
		fontWeight: Theme.typography.fontWeightRegular,
		color: Theme.colors.muted,
		letterSpacing: Theme.typography.letterSpacingWide,
		textTransform: 'uppercase',
	},
});
