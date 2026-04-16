import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Theme } from '@/constants/Theme';

export default function ModalScreen() {
	const router = useRouter();

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>CATWIKI / 2026</Text>
				<View style={styles.divider} />

				<Text style={styles.section}>ABOUT THIS PROJECT</Text>
				<Text style={styles.body}>
					CatWiki is a brutalist exploration of feline breeds and our encounters
					with them. A celebration of adoption, shelter culture, and the raw
					beauty of our companions.
				</Text>

				<View style={styles.divider} />

				<Text style={styles.section}>ETHICAL STANCE</Text>
				<Text style={styles.body}>
					ADOPT, don't shop. Support local shelters. Every cat deserves a home.
				</Text>

				<View style={styles.divider} />

				<Text style={styles.section}>BUILT WITH</Text>
				<Text style={styles.body}>
					Expo Router, React Native, Brutalist Design Principles
				</Text>

				<Pressable style={styles.closeButton} onPress={() => router.back()}>
					<Text style={styles.closeButtonText}>CLOSE</Text>
				</Pressable>
			</View>

			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.colors.background,
	},
	content: {
		padding: Theme.neobrutalism.spacing,
		backgroundColor: Theme.colors.surface,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		margin: Theme.neobrutalism.spacing,
		marginTop: 80,
		borderRadius: Theme.neobrutalism.borderRadius,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	} as any,
	title: {
		fontSize: 28,
		fontWeight: '600' as const,
		color: Theme.colors.text,
		letterSpacing: Theme.typography.letterSpacingNormal,
		marginBottom: 24,
	},
	divider: {
		height: Theme.neobrutalism.thinBorder,
		backgroundColor: Theme.colors.border,
		marginVertical: 24,
	} as any,
	section: {
		fontSize: 11,
		fontWeight: '600' as const,
		color: Theme.colors.primary,
		paddingHorizontal: 0,
		paddingVertical: 0,
		letterSpacing: Theme.typography.letterSpacingWide,
		marginBottom: 12,
		alignSelf: 'flex-start',
		textTransform: 'uppercase',
	},
	body: {
		fontSize: 15,
		fontWeight: '300' as const,
		color: Theme.colors.text,
		lineHeight: 24,
		marginBottom: 24,
		letterSpacing: 0.3,
	},
	closeButton: {
		backgroundColor: Theme.colors.primary,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.primary,
		padding: 16,
		alignItems: 'center',
		marginTop: 24,
		borderRadius: Theme.neobrutalism.borderRadius,
	} as any,
	closeButtonText: {
		fontSize: 14,
		fontWeight: '600' as const,
		color: Theme.colors.surface,
		letterSpacing: Theme.typography.letterSpacingWide,
		textTransform: 'uppercase',
	},
});
