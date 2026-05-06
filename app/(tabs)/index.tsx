import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Suspense, use } from 'react';
import {
	Dimensions,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import EthicalBanner from '@/components/EthicalBanner';
import { Theme } from '@/constants/Theme';
import { fetchBreeds } from '@/features/breeds/api';

const { width } = Dimensions.get('window');
const breedsPromise = fetchBreeds();

function BreedList() {
	const breeds = use(breedsPromise);
	const router = useRouter();

	return (
		<FlatList
			data={breeds}
			keyExtractor={(item) => item.id}
			ListHeaderComponent={() => (
				<View style={styles.header}>
					<Text style={styles.overtitle}>CATWIKI / EDITION 2026</Text>
					<Text style={styles.mainTitle}>FELINE{'\n'}LIBRARY</Text>
					<View style={styles.accentLine} />
					<View style={styles.dotBlue} />
					<View style={styles.dotPink} />
					<EthicalBanner />
				</View>
			)}
			renderItem={({ item }) => (
				<Pressable
					style={styles.card}
					onPress={() =>
						router.push({
							pathname: '/breed/[id]',
							params: {
								id: item.id,
								name: item.name,
								affection_level: item.affection_level,
								description: item.description,
								image_url: item.image?.url,
								origin: item.origin,
								temperament: item.temperament,
							},
						})
					}
				>
					<Image
						source={{ uri: item.image?.url }}
						style={styles.cardImage}
						contentFit="cover"
						transition={500}
					/>
					<View style={styles.cardInfo}>
						<Text style={styles.cardName}>
							{item.name.toUpperCase()}
						</Text>
						<Text style={styles.cardOrigin}>{item.origin}</Text>
					</View>
				</Pressable>
			)}
			contentContainerStyle={styles.list}
		/>
	);
}

export default function EncyclopediaScreen() {
	return (
		<View style={styles.container}>
			<Suspense
				fallback={
					<View style={styles.center}>
						<Text style={styles.loadingText}>LOADING_</Text>
					</View>
				}
			>
				<BreedList />
			</Suspense>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Theme.colors.background },
	list: { paddingBottom: 60 },
	header: {
		paddingHorizontal: Theme.neobrutalism.spacing,
		paddingTop: 60,
		marginBottom: 40,
		paddingBottom: 32,
		backgroundColor: Theme.colors.surface,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		marginHorizontal: Theme.neobrutalism.spacing,
		marginTop: Theme.neobrutalism.spacing,
		borderRadius: Theme.neobrutalism.borderRadius,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
		position: 'relative',
	},
	overtitle: {
		fontSize: 11,
		letterSpacing: Theme.typography.letterSpacingWide,
		color: Theme.colors.primary,
		marginBottom: 16,
		fontWeight: Theme.typography.fontWeightBold,
		textTransform: 'uppercase',
	},
	mainTitle: {
		fontSize: 52,
		fontWeight: Theme.typography.fontWeightBlack,
		color: Theme.colors.text,
		lineHeight: 56,
		letterSpacing: 0.8,
		marginBottom: 24,
		textTransform: 'uppercase',
	},
	accentLine: {
		width: 96,
		height: 12,
		backgroundColor: Theme.colors.primary,
		borderRadius: 999,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		marginBottom: 12,
	},
	dotBlue: {
		width: 24,
		height: 24,
		borderRadius: 999,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		backgroundColor: Theme.colors.secondary,
		position: 'absolute',
		top: 18,
		right: 18,
	},
	dotPink: {
		width: 20,
		height: 20,
		borderRadius: 999,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		backgroundColor: Theme.colors.accent,
		position: 'absolute',
		top: 46,
		right: 46,
	},
	card: {
		marginBottom: 28,
		marginHorizontal: Theme.neobrutalism.spacing,
		borderRadius: Theme.neobrutalism.borderRadius,
		overflow: 'hidden',
		backgroundColor: Theme.colors.surface,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		shadowColor: Theme.neobrutalism.shadowColor,
		shadowOffset: Theme.neobrutalism.shadowOffset,
		shadowOpacity: Theme.neobrutalism.shadowOpacity,
		shadowRadius: Theme.neobrutalism.shadowRadius,
	},
	cardImage: {
		width: '100%',
		height: width * 0.72,
		backgroundColor: Theme.colors.secondary,
	},
	cardInfo: {
		marginTop: 0,
		marginBottom: 0,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		padding: 20,
	},
	cardName: {
		fontSize: 22,
		fontWeight: Theme.typography.fontWeightBlack,
		color: Theme.colors.text,
		letterSpacing: 0.7,
		marginBottom: 8,
	},
	cardOrigin: {
		fontSize: 12,
		color: Theme.colors.text,
		fontWeight: Theme.typography.fontWeightBold,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		backgroundColor: Theme.colors.accent,
		paddingVertical: 6,
		paddingHorizontal: 10,
		overflow: 'hidden',
		borderRadius: 999,
	},
	center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	loadingText: {
		letterSpacing: Theme.typography.letterSpacingWide,
		color: Theme.colors.text,
		fontSize: 12,
		fontWeight: Theme.typography.fontWeightBold,
	},
});
