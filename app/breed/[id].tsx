import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Theme } from '@/constants/Theme';

const { width } = Dimensions.get('window');

export default function BreedDetailScreen() {
	const [isFavorite, setIsFavorite] = useState(false);

	const {
		affection_level,
		description,
		image_url,
		name,
		origin,
		temperament,
	} = useLocalSearchParams<{
		affection_level: string;
		description: string;
		image_url: string;
		name: string;
		origin: string;
		temperament: string;
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

			<View>
				<Image
					source={{ uri: image_url }}
					style={styles.heroImage}
					contentFit="cover"
					transition={1000}
				/>
				<TouchableOpacity
					onPress={() => setIsFavorite(!isFavorite)}
					style={styles.favoriteButton}
				>
					<MaterialDesignIcons
						name={isFavorite ? 'heart' : 'heart-outline'}
						color={
							isFavorite
								? Theme.colors.accentAlt
								: Theme.colors.border
						}
						size={25}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
				{/* Overlapping Brutalist Title */}
				<View style={styles.titleContainer}>
					<Text style={styles.name}>{name?.toUpperCase()}</Text>
					<View style={styles.accentBar} />
				</View>

				{/* Origin Section */}
				<View style={styles.section}>
					<Text style={styles.label}>ORIGIN</Text>
					<Text style={styles.text}>{origin}</Text>
				</View>

				{/* Affection Section - High Contrast */}
				<View style={styles.section}>
					<Text style={styles.label}>AFFECTION</Text>
					<View style={styles.tagCloud}>
						{Array.from({ length: Number(affection_level) }).map(
							(_, i) => (
								<MaterialDesignIcons
									key={i}
									name="heart-multiple"
									color={Theme.colors.accentAlt}
									size={25}
								/>
							),
						)}
					</View>
				</View>

				{/* Temperament Section - High Contrast */}
				<View style={styles.section}>
					<Text style={styles.label}>CHARACTER_TRAITS</Text>
					<View style={styles.tagCloud}>
						{temperament?.split(',').map((tag) => (
							<View key={tag} style={styles.tag}>
								<Text style={styles.tagText}>
									{tag.trim().toUpperCase()}
								</Text>
							</View>
						))}
					</View>
				</View>

				{/* Description Section */}
				<View style={styles.section}>
					<Text style={styles.label}>STORY_AND_ORIGIN</Text>
					<Text style={styles.text}>{description}</Text>
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
		boxShadow: `4px 6px 0 ${Theme.colors.border}`,
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
		boxShadow: `4px 6px 0 ${Theme.colors.border}`,
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
		boxShadow: `1px 1px ${Theme.colors.accentAlt}, 2px 2px #000, 2px 2px #000, 0.5px 2px #000, 2px 0.5px #000`,
		borderRadius: 8,
	},
	tagText: {
		fontSize: 12,
		fontWeight: Theme.typography.fontWeightRegular,
		color: Theme.colors.text,
		letterSpacing: 0.3,
	},
	tagHeart: {
		fontSize: 15,
		fontWeight: Theme.typography.fontWeightBold,
		color: Theme.colors.accentAlt,
	},
	text: {
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
	favoriteButton: {
		position: 'absolute',
		bottom: 16,
		right: 16,
		width: 52,
		height: 52,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Theme.colors.surface,
		borderRadius: 999,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		boxShadow: `1px 2px 0 ${Theme.colors.border}`,
	},
});
