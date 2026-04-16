import { Plus } from 'lucide-react-native';
import { useOptimistic, useTransition } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/constants/Theme';
import { useEncounters } from '@/features/encounters/hooks';

export default function JournalScreen() {
	const { encounters, addEncounterAction } = useEncounters();
	const [isPending, startTransition] = useTransition();

	const [optimisticEncounters, addOptimistic] = useOptimistic(
		encounters,
		(state, newEnc: any) => [
			{ ...newEnc, id: Math.random(), isOptimistic: true },
			...state,
		],
	);

	const handleQuickAdd = () => {
		const entry = {
			date: new Date().toLocaleDateString(),
			location: 'STREET_FIND',
			notes: 'Black cat, very mysterious.',
			breed_id: null,
			photo_uri: null,
		};

		startTransition(async () => {
			addOptimistic(entry);
			await addEncounterAction(entry);
		});
	};

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scroll}>
				<View style={styles.header}>
					<Text style={styles.title}>MY_CATS</Text>
					<Text style={styles.counter}>{encounters.length} / SAVED</Text>
				</View>

				{optimisticEncounters.map((item) => (
					<View
						key={item.id}
						style={[styles.card, item.isOptimistic && { opacity: 0.6 }]}
					>
						<View style={styles.cardHeader}>
							<Text style={styles.cardDate}>{item.date.toUpperCase()}</Text>
							<Text style={styles.cardTag}>{item.location}</Text>
						</View>
						<Text style={styles.cardNotes}>{item.notes}</Text>
					</View>
				))}
			</ScrollView>

			{/* Brutalist FAB */}
			<Pressable
				style={styles.fab}
				onPress={handleQuickAdd}
				disabled={isPending}
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
		alignItems: 'center',
		marginBottom: 12,
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
