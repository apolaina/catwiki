import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import {
	Alert,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { Theme } from '@/constants/Theme';
import { type BreedOption, fetchBreedOptions } from '@/features/breeds/api';
import type { NewEncounter } from '@/features/encounters/types';

const UNKNOWN_BREED_LABEL = 'Chat de gouttiere';

interface EncounterFormProps {
	initialValues: NewEncounter;
	screenLabel: string;
	submitLabel: string;
	onCancel: () => void;
	onSubmit: (values: NewEncounter) => Promise<void>;
	onDelete?: () => Promise<void>;
	isBusy?: boolean;
}

export default function EncounterForm({
	initialValues,
	isBusy,
	onCancel,
	onDelete,
	onSubmit,
	screenLabel,
	submitLabel,
}: EncounterFormProps) {
	const [form, setForm] = useState<NewEncounter>(initialValues);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showBreedPicker, setShowBreedPicker] = useState(false);
	const [breedOptions, setBreedOptions] = useState<BreedOption[]>([
		{ id: null, name: UNKNOWN_BREED_LABEL },
	]);

	useEffect(() => {
		setForm(initialValues);
	}, [initialValues]);

	useEffect(() => {
		let isMounted = true;

		fetchBreedOptions()
			.then((options) => {
				if (isMounted) {
					setBreedOptions(options);
				}
			})
			.catch(() => {
				if (isMounted) {
					setBreedOptions([{ id: null, name: UNKNOWN_BREED_LABEL }]);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	const selectedBreedLabel = useMemo(() => {
		return (
			breedOptions.find((option) => option.id === form.breed_id)?.name ??
			UNKNOWN_BREED_LABEL
		);
	}, [breedOptions, form.breed_id]);

	const pickPhoto = async () => {
		const permission =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permission.granted) {
			Alert.alert(
				'Permission required',
				'Please allow photo library access.',
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.7,
		});

		if (!result.canceled) {
			setForm((prev) => ({
				...prev,
				photo_uri: result.assets[0]?.uri ?? null,
			}));
		}
	};

	const handleSubmit = async () => {
		const trimmedNotes = form.notes.trim();
		const trimmedDate = form.date.trim();

		if (!trimmedDate || !/^\d{4}-\d{2}-\d{2}$/.test(trimmedDate)) {
			Alert.alert('Invalid date', 'Use YYYY-MM-DD format.');
			return;
		}

		if (!trimmedNotes) {
			Alert.alert('Missing note', 'Please add a personal note.');
			return;
		}

		setIsSubmitting(true);
		try {
			await onSubmit({
				...form,
				date: trimmedDate,
				location: form.location.trim(),
				notes: trimmedNotes,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const isLocked = Boolean(isBusy || isSubmitting);

	return (
		<ScrollView contentContainerStyle={styles.content}>
			<Text style={styles.label}>{screenLabel}</Text>

			<Text style={styles.fieldTitle}>DATE</Text>
			<TextInput
				style={styles.input}
				value={form.date}
				onChangeText={(value) =>
					setForm((prev) => ({ ...prev, date: value }))
				}
				placeholder="YYYY-MM-DD"
				placeholderTextColor={Theme.colors.muted}
				autoCapitalize="none"
			/>

			<Text style={styles.fieldTitle}>LOCATION</Text>
			<TextInput
				style={styles.input}
				value={form.location}
				onChangeText={(value) =>
					setForm((prev) => ({ ...prev, location: value }))
				}
				placeholder="Shelter, street, home..."
				placeholderTextColor={Theme.colors.muted}
			/>

			<Text style={styles.fieldTitle}>BREED</Text>
			<Pressable
				style={styles.selectButton}
				onPress={() => setShowBreedPicker(true)}
				disabled={isLocked}
			>
				<Text style={styles.selectButtonText}>
					{selectedBreedLabel}
				</Text>
			</Pressable>

			<Text style={styles.fieldTitle}>PERSONAL_NOTE</Text>
			<TextInput
				style={styles.notesInput}
				value={form.notes}
				onChangeText={(value) =>
					setForm((prev) => ({ ...prev, notes: value }))
				}
				placeholder="What happened with this cat?"
				placeholderTextColor={Theme.colors.muted}
				multiline
				textAlignVertical="top"
			/>

			<Text style={styles.fieldTitle}>PHOTO</Text>
			<Pressable
				style={styles.photoButton}
				onPress={pickPhoto}
				disabled={isLocked}
			>
				<Text style={styles.photoButtonText}>
					{form.photo_uri ? 'CHANGE_PHOTO' : 'SELECT_PHOTO'}
				</Text>
			</Pressable>
			{form.photo_uri ? (
				<View style={styles.photoWrap}>
					<Image
						source={{ uri: form.photo_uri }}
						style={styles.photoPreview}
					/>
					<Pressable
						style={styles.removePhotoButton}
						onPress={() =>
							setForm((prev) => ({ ...prev, photo_uri: null }))
						}
						disabled={isLocked}
					>
						<Text style={styles.removePhotoText}>REMOVE_PHOTO</Text>
					</Pressable>
				</View>
			) : null}

			<View style={styles.actions}>
				<Pressable
					style={[
						styles.primaryButton,
						isLocked && styles.buttonDisabled,
					]}
					onPress={handleSubmit}
					disabled={isLocked}
				>
					<Text style={styles.primaryButtonText}>{submitLabel}</Text>
				</Pressable>

				{onDelete ? (
					<Pressable
						style={[
							styles.dangerButton,
							isLocked && styles.buttonDisabled,
						]}
						onPress={onDelete}
						disabled={isLocked}
					>
						<Text style={styles.dangerButtonText}>DELETE_NOTE</Text>
					</Pressable>
				) : null}

				<Pressable
					style={styles.cancelButton}
					onPress={onCancel}
					disabled={isLocked}
				>
					<Text style={styles.cancelText}>CANCEL</Text>
				</Pressable>
			</View>

			<Modal
				visible={showBreedPicker}
				transparent
				animationType="fade"
				onRequestClose={() => setShowBreedPicker(false)}
			>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => setShowBreedPicker(false)}
				>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>SELECT_BREED</Text>
						<ScrollView>
							{breedOptions.map((option) => {
								const isSelected = option.id === form.breed_id;
								return (
									<Pressable
										key={option.id ?? 'unknown'}
										style={styles.modalOption}
										onPress={() => {
											setForm((prev) => ({
												...prev,
												breed_id: option.id,
											}));
											setShowBreedPicker(false);
										}}
									>
										<Text style={styles.modalOptionText}>
											{option.name}
										</Text>
										<Text style={styles.modalOptionCheck}>
											{isSelected ? 'SELECTED' : ''}
										</Text>
									</Pressable>
								);
							})}
						</ScrollView>
					</View>
				</Pressable>
			</Modal>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: {
		padding: Theme.neobrutalism.spacing,
		paddingTop: 24,
		paddingBottom: 48,
		backgroundColor: Theme.colors.background,
	},
	label: {
		fontSize: 11,
		fontWeight: Theme.typography.fontWeightBold,
		letterSpacing: Theme.typography.letterSpacingWide,
		marginBottom: 24,
		color: Theme.colors.primary,
		textTransform: 'uppercase',
	},
	fieldTitle: {
		fontSize: 11,
		marginBottom: 8,
		color: Theme.colors.primary,
		fontWeight: Theme.typography.fontWeightBold,
		letterSpacing: Theme.typography.letterSpacingWide,
	},
	input: {
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 14,
		fontSize: 15,
		fontWeight: Theme.typography.fontWeightRegular,
		backgroundColor: Theme.colors.surface,
		marginBottom: 16,
		color: Theme.colors.text,
		borderRadius: Theme.neobrutalism.borderRadius,
	},
	selectButton: {
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 14,
		backgroundColor: Theme.colors.surface,
		marginBottom: 16,
		borderRadius: Theme.neobrutalism.borderRadius,
	},
	selectButtonText: {
		fontSize: 15,
		color: Theme.colors.text,
		fontWeight: Theme.typography.fontWeightRegular,
	},
	notesInput: {
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 16,
		fontSize: 16,
		fontWeight: Theme.typography.fontWeightLight,
		minHeight: 150,
		backgroundColor: Theme.colors.surface,
		marginBottom: 16,
		color: Theme.colors.text,
		borderRadius: Theme.neobrutalism.borderRadius,
	},
	photoButton: {
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 14,
		backgroundColor: Theme.colors.secondary,
		marginBottom: 12,
		alignItems: 'center',
		borderRadius: Theme.neobrutalism.borderRadius,
	},
	photoButtonText: {
		fontSize: 13,
		color: Theme.colors.text,
		fontWeight: Theme.typography.fontWeightBold,
		letterSpacing: Theme.typography.letterSpacingWide,
	},
	photoWrap: {
		marginBottom: 20,
	},
	photoPreview: {
		width: '100%',
		height: 240,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		borderRadius: Theme.neobrutalism.borderRadius,
		backgroundColor: Theme.colors.background,
	},
	removePhotoButton: {
		marginTop: 10,
		alignItems: 'center',
	},
	removePhotoText: {
		fontSize: 12,
		color: Theme.colors.muted,
		letterSpacing: Theme.typography.letterSpacingWide,
		fontWeight: Theme.typography.fontWeightBold,
	},
	actions: {
		gap: 12,
	},
	primaryButton: {
		backgroundColor: Theme.colors.primary,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 16,
		alignItems: 'center',
		borderRadius: Theme.neobrutalism.borderRadius,
	},
	primaryButtonText: {
		color: Theme.colors.surface,
		fontWeight: Theme.typography.fontWeightBold,
		fontSize: 14,
		letterSpacing: Theme.typography.letterSpacingWide,
		textTransform: 'uppercase',
	},
	dangerButton: {
		backgroundColor: Theme.colors.accent,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 16,
		alignItems: 'center',
		borderRadius: Theme.neobrutalism.borderRadius,
	},
	dangerButtonText: {
		color: Theme.colors.text,
		fontWeight: Theme.typography.fontWeightBold,
		fontSize: 14,
		letterSpacing: Theme.typography.letterSpacingWide,
		textTransform: 'uppercase',
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	cancelButton: {
		padding: 14,
		alignItems: 'center',
	},
	cancelText: {
		fontSize: 13,
		fontWeight: Theme.typography.fontWeightRegular,
		color: Theme.colors.muted,
		letterSpacing: Theme.typography.letterSpacingWide,
		textTransform: 'uppercase',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.35)',
		justifyContent: 'center',
		padding: Theme.neobrutalism.spacing,
	},
	modalContent: {
		maxHeight: '70%',
		backgroundColor: Theme.colors.surface,
		borderRadius: Theme.neobrutalism.borderRadius,
		borderWidth: Theme.neobrutalism.cardBorder,
		borderColor: Theme.colors.border,
		padding: 16,
	},
	modalTitle: {
		fontSize: 12,
		marginBottom: 12,
		fontWeight: Theme.typography.fontWeightBold,
		letterSpacing: Theme.typography.letterSpacingWide,
		color: Theme.colors.primary,
	},
	modalOption: {
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: Theme.colors.border,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	modalOptionText: {
		fontSize: 15,
		color: Theme.colors.text,
	},
	modalOptionCheck: {
		fontSize: 10,
		fontWeight: Theme.typography.fontWeightBold,
		color: Theme.colors.primary,
		letterSpacing: Theme.typography.letterSpacingWide,
	},
});
