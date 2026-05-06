import { Plus, Trash2 } from 'lucide-react-native';
import { useOptimistic, useState, useTransition } from 'react';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { Theme } from '@/constants/Theme';
import { useEncounters } from '@/features/encounters/hooks';
import type { Encounter, NewEncounter } from '@/features/encounters/types';

const MAX_NOTES_LENGTH = 180;

export default function JournalScreen() {
	const { encounters, addEncounterAction, deleteEncounterAction } =
		useEncounters();
	const [isPending, startTransition] = useTransition();
	const [noteDraft, setNoteDraft] = useState('');

	const [optimisticEncounters, addOptimistic] = useOptimistic<
		(Encounter & { isOptimistic?: boolean })[],
		NewEncounter
	>(encounters, (state, newEnc) => [
		{ ...newEnc, id: Math.random(), isOptimistic: true },
		...state,
	]);

	const canSubmit = noteDraft.trim().length > 0 && !isPending;

	const handleQuickAdd = () => {
		const cleanedNotes = noteDraft.trim();
		if (!cleanedNotes) return;

		const entry: NewEncounter = {
			date: new Date().toLocaleDateString(),
			location: 'STREET_FIND',
			notes: cleanedNotes,
			breed_id: null,
			photo_uri: null,
		};

		startTransition(async () => {
			addOptimistic(entry);
			await addEncounterAction(entry);
			setNoteDraft('');
		});
	};

	const handleDelete = (id: number) => {
		startTransition(async () => {
			await deleteEncounterAction(id);
		});
	};

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scroll}>
				<View style={styles.header}>
					<Text style={styles.title}>MY_CATS</Text>
					<Text style={styles.counter}>{encounters.length} / SAVED</Text>
				</View>

				<View style={styles.composer}>
					<Text style={styles.composerTitle}>ADD_NOTE</Text>
					<TextInput
						style={styles.input}
						value={noteDraft}
						onChangeText={setNoteDraft}
						placeholder="Write your cat encounter..."
						placeholderTextColor={Theme.colors.muted}
						multiline
						maxLength={MAX_NOTES_LENGTH}
						textAlignVertical="top"
					/>
					<Text style={styles.inputCount}>
						{noteDraft.length} / {MAX_NOTES_LENGTH}
					</Text>
				</View>

			{optimisticEncounters.map((item) => (
				<View
					key={item.id}
					style={[styles.card, item.isOptimistic && { opacity: 0.6 }]}
				>
					<View style={styles.cardHeader}>
						<View style={styles.cardHeaderLeft}>
							<Text style={styles.cardDate}>{item.date.toUpperCase()}</Text>
							<Text style={styles.cardTag}>{item.location}</Text>
						</View>
						<Pressable
							onPress={() => handleDelete(item.id)}
							disabled={item.isOptimistic || isPending}
							style={({ pressed }) => [
								styles.deleteButton,
								pressed && styles.deleteButtonPressed,
								(item.isOptimistic || isPending) &&
									styles.deleteButtonDisabled,
							]}
						>
							<Trash2
								color={Theme.colors.text}
								size={18}
								strokeWidth={2.5}
							/>
						</Pressable>
					</View>
					<Text style={styles.cardNotes}>{item.notes}</Text>
				</View>
			))}
			</ScrollView>

			{/* Brutalist FAB */}
			<Pressable
				style={[styles.fab, !canSubmit && styles.fabDisabled]}
				onPress={handleQuickAdd}
				disabled={!canSubmit}
			>
				<Plus color="#FFF" size={32} strokeWidth={3} />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Theme.colors.background },
	scroll: { padding: Theme.neobrutalism.spacing, paddingTop: 60 },
	header: {
		marginBottom: 40,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 20,
		backgroundColor: Theme.colors.surface,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	},
	title: {
		fontSize: 40,
		fontWeight: Theme.typography.fontWeightBlack,
		color: Theme.colors.text,
		letterSpacing: 0.5,
		marginBottom: 12,
	},
	counter: {
		fontSize: 12,
		fontWeight: Theme.typography.fontWeightRegular,
		color: Theme.colors.primary,
		letterSpacing: Theme.typography.letterSpacingWide,
		textTransform: 'uppercase',
	},
	composer: {
		backgroundColor: Theme.colors.surface,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: Theme.neobrutalism.spacing,
		marginBottom: 20,
		borderRadius: Theme.neobrutalism.borderRadius,
	},
	composerTitle: {
		fontSize: 11,
		fontWeight: Theme.typography.fontWeightBold,
		letterSpacing: Theme.typography.letterSpacingWide,
		color: Theme.colors.primary,
		marginBottom: 10,
	},
	input: {
		minHeight: 96,
		padding: 12,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		borderRadius: 6,
		fontSize: 15,
		color: Theme.colors.text,
		backgroundColor: Theme.colors.background,
	},
	inputCount: {
		fontSize: 11,
		marginTop: 8,
		textAlign: 'right',
		color: Theme.colors.muted,
		fontWeight: Theme.typography.fontWeightRegular,
	},

	card: {
		backgroundColor: Theme.colors.surface,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: Theme.neobrutalism.spacing,
		marginBottom: 20,
		borderRadius: Theme.neobrutalism.borderRadius,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 12,
		gap: 12,
	},
	cardHeaderLeft: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	cardDate: {
		fontSize: 12,
		fontWeight: Theme.typography.fontWeightBold,
		color: Theme.colors.text,
		letterSpacing: Theme.typography.letterSpacingWide,
	},
	cardTag: {
		fontSize: 11,
		backgroundColor: Theme.colors.secondary,
		color: Theme.colors.text,
		paddingHorizontal: 10,
		paddingVertical: 6,
		fontWeight: Theme.typography.fontWeightBold,
		borderRadius: 6,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
	},
	deleteButton: {
		padding: 8,
		borderRadius: 6,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		backgroundColor: Theme.colors.background,
	},
	deleteButtonPressed: {
		backgroundColor: Theme.colors.accent,
		opacity: 0.8,
	},
	deleteButtonDisabled: {
		opacity: 0.5,
	},
	cardNotes: {
		fontSize: 15,
		fontWeight: Theme.typography.fontWeightLight,
		lineHeight: 24,
		color: Theme.colors.text,
	},

	fab: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		width: 64,
		height: 64,
		backgroundColor: Theme.colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Theme.neobrutalism.borderRadius,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	},
	fabDisabled: {
		opacity: 0.5,
	},
});
