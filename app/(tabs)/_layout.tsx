import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import type React from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Theme } from '@/constants/Theme';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const insets = useSafeAreaInsets();
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Theme.colors.primary,
				tabBarInactiveTintColor: Theme.colors.muted,
				tabBarLabelStyle: {
					fontWeight: Theme.typography.fontWeightBold,
					letterSpacing: 0.8,
					fontSize: 10,
					textTransform: 'uppercase',
				},
				tabBarStyle: {
					backgroundColor: Theme.colors.surface,
					borderTopWidth: Theme.neobrutalism.cardBorder,
					borderTopColor: Theme.colors.border,
					borderLeftWidth: Theme.neobrutalism.cardBorder,
					borderRightWidth: Theme.neobrutalism.cardBorder,
					borderLeftColor: Theme.colors.border,
					borderRightColor: Theme.colors.border,
					// We add the bottom inset to push the tabs up on your S25
					height: 60 + insets.bottom,
					paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
					paddingTop: 10,
					shadowColor: Theme.neobrutalism.shadowColor,
					shadowOffset: { width: 0, height: -4 },
					shadowOpacity: 0.25,
					shadowRadius: 0,
				},
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
				headerStyle: {
					backgroundColor: Theme.colors.surface,
					borderBottomWidth: Theme.neobrutalism.cardBorder,
					borderBottomColor: Theme.colors.border,
					shadowColor: Theme.neobrutalism.shadowColor,
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.12,
					shadowRadius: 0,
				},
				headerTitleStyle: {
					fontWeight: Theme.typography.fontWeightBlack,
					fontSize: 16,
					letterSpacing: 0.8,
					color: Theme.colors.text,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'RACES / LIBRARY',
					tabBarIcon: ({ color }) => <TabBarIcon name="paw" color={color} />,
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="info-circle"
										size={25}
										color={Theme.colors.text}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name="journal"
				options={{
					title: 'ENCOUNTERS / JOURNAL',
					tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
				}}
			/>
		</Tabs>
	);
}
