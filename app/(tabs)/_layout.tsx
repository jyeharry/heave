import { Link, Tabs } from 'expo-router'
import { Icon, IconButton } from 'react-native-paper'
import { theme } from '@/constants/theme'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { source: any; color: string }) {
  return <Icon size={28} {...props} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colours.accent1,
        tabBarInactiveTintColor: theme.colours.grey300,
        headerStyle: { backgroundColor: theme.colours.dark },
        headerTitleStyle: { color: theme.colours.white },
        tabBarStyle: { backgroundColor: theme.colours.dark },
        headerTintColor: theme.colours.grey300,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon source="home" color={color} />,
          headerRight: ({ tintColor }) => (
            <Link href="/modal" asChild>
              <IconButton icon="information" size={25} iconColor={tintColor} />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color }) => (
            <TabBarIcon source="weight-lifter" color={color} />
          ),
          headerRight: ({ tintColor }) => (
            <Link href="/workouts/add" asChild>
              <IconButton icon="plus" size={25} iconColor={tintColor} />
            </Link>
          ),
        }}
      />
    </Tabs>
  )
}
