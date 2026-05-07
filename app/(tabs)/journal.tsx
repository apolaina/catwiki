import { type Href, useFocusEffect, useRouter } from 'expo-router';
import { Plus, Trash2 } from 'lucide-react-native';
import { useCallback, useTransition } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/constants/Theme';
import { useEncounters } from '@/features/encounters/hooks';

export default function JournalScreen() {
	const router = useRouter();
	const { encounters, deleteEncounterAction, refreshEncountersAction } =
		useEncounters();
	const [isPending, startTransition] = useTransition();

	useFocusEffect(
		useCallback(() => {
			refreshEncountersAction();
		}, [refreshEncountersAction]),
	);

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
					<Text style={styles.counter}>
						{encounters.length} / SAVED
					</Text>
				</View>

				{encounters.map((item) => (
					<Pressable
						key={item.id}
						style={styles.card}
						onPress={() =>
							router.push(`/encounters/${item.id}` as Href)
						}
					>
						<View style={styles.cardHeader}>
							<View style={styles.cardHeaderLeft}>
								<Text style={styles.cardDate}>{item.date}</Text>
								<Text style={styles.cardTag}>
									{item.location || 'UNKNOWN_LOCATION'}
								</Text>
							</View>
							<Pressable
								onPress={(event) => {
									event.stopPropagation();
									handleDelete(item.id);
								}}
								disabled={isPending}
								style={({ pressed }) => [
									styles.deleteButton,
									pressed && styles.deleteButtonPressed,
									isPending && styles.deleteButtonDisabled,
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
					</Pressable>
				))}
			</ScrollView>

			<Pressable
				style={styles.fab}
				onPress={() => router.push('/encounters/new')}
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
});
