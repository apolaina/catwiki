import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/constants/Theme';

export default function EthicalBanner() {
	return (
		<View style={styles.container}>
			<View style={styles.border}>
				<Text style={styles.text}>ADOPT A SOUL,{'\n'}NOT A BREED.</Text>
				<View style={styles.badge}>
					<Text style={styles.badgeText}>SHELTER FIRST</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 32,
		alignItems: 'flex-start',
	},
	border: {
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		paddingHorizontal: 18,
		paddingVertical: 18,
		backgroundColor: Theme.colors.secondary,
		borderRadius: Theme.neobrutalism.borderRadius,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	},
	text: {
		fontSize: 14,
		fontWeight: Theme.typography.fontWeightBold,
		color: Theme.colors.text,
		lineHeight: 20,
		letterSpacing: Theme.typography.letterSpacingWide,
	},
	badge: {
		marginTop: 12,
		backgroundColor: Theme.colors.primary,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 6,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
	},
	badgeText: {
		fontSize: 11,
		color: Theme.colors.surface,
		fontWeight: Theme.typography.fontWeightBold,
		letterSpacing: Theme.typography.letterSpacingWide,
		textTransform: 'uppercase',
	},
});
