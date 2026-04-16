import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useId } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/constants/Theme';

const { width } = Dimensions.get('window');

export default function BreedDetailScreen() {
	const _id = useId();
	const { name, description, temperament, image_url } = useLocalSearchParams<{
		name: string;
		description: string;
		temperament: string;
		image_url: string;
	}>();

	return (
		<ScrollView style={styles.container} bounces={true}>
			<Stack.Screen
				options={{
					headerTransparent: true,
					headerTitle: '',
					headerTintColor: '#FFF',
				}}
			/>

			<Image
				source={{ uri: image_url }}
				style={styles.heroImage}
				contentFit="cover"
				transition={1000}
			/>

			<View style={styles.content}>
				{/* Overlapping Brutalist Title */}
				<View style={styles.titleContainer}>
					<Text style={styles.name}>{name?.toUpperCase()}</Text>
					<View style={styles.accentBar} />
				</View>

				{/* Temperament Section - High Contrast */}
				<View style={styles.section}>
					<Text style={styles.label}>CHARACTER_TRAITS</Text>
					<View style={styles.tagCloud}>
						{temperament?.split(',').map((tag) => (
							<View key={tag} style={styles.tag}>
								<Text style={styles.tagText}>{tag.trim().toUpperCase()}</Text>
							</View>
						))}
					</View>
				</View>

				{/* Description Section */}
				<View style={styles.section}>
					<Text style={styles.label}>STORY_AND_ORIGIN</Text>
					<Text style={styles.description}>{description}</Text>
				</View>

				{/* Closing Brutalist Line */}
				<View style={styles.footerLine} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.colors.background,
	},
	heroImage: {
		width: width,
		height: width * 1.05,
		backgroundColor: Theme.colors.secondary,
		borderBottomWidth: Theme.neobrutalism.cardBorder,
		borderBottomColor: Theme.colors.border,
		overflow: 'hidden',
	},
	content: {
		paddingHorizontal: Theme.neobrutalism.spacing,
		marginTop: 0,
		backgroundColor: Theme.colors.background,
		paddingTop: 24,
		paddingBottom: 100,
	},
	titleContainer: {
		marginBottom: 32,
		padding: 20,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		backgroundColor: Theme.colors.surface,
		borderRadius: Theme.neobrutalism.borderRadius,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	},
	name: {
		fontSize: 40,
		fontWeight: Theme.typography.fontWeightBlack,
		letterSpacing: 0.4,
		lineHeight: 44,
		color: Theme.colors.text,
	},
	accentBar: {
		width: 72,
		height: 10,
		backgroundColor: Theme.colors.primary,
		borderRadius: 999,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		marginTop: 16,
	},
	section: {
		marginBottom: 32,
		padding: 20,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		backgroundColor: Theme.colors.surface,
		borderRadius: Theme.neobrutalism.borderRadius,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	},
	label: {
		fontSize: 11,
		fontWeight: Theme.typography.fontWeightBold,
		letterSpacing: Theme.typography.letterSpacingWide,
		color: Theme.colors.primary,
		marginBottom: 16,
		textTransform: 'uppercase',
	},
	tagCloud: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	tag: {
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: Theme.colors.accent,
		borderRadius: 8,
	},
	tagText: {
		fontSize: 12,
		fontWeight: Theme.typography.fontWeightRegular,
		color: Theme.colors.text,
		letterSpacing: 0.3,
	},
	description: {
		fontSize: 16,
		lineHeight: 26,
		fontWeight: Theme.typography.fontWeightLight,
		color: Theme.colors.text,
	},
	footerLine: {
		height: 14,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		backgroundColor: Theme.colors.accent,
		borderRadius: 999,
		marginTop: 4,
	},
});
