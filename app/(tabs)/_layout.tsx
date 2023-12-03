import { Link, Tabs } from 'expo-router'
import { Icon, IconButton } from 'react-native-paper'
import Colors from '@/constants/Colors'

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
        tabBarActiveTintColor: Colors.light.tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon source="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <IconButton icon="information" size={25} />
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
          headerRight: () => (
            <Link href="/workouts/add" asChild>
              <IconButton icon="plus" size={25} />
            </Link>
          ),
        }}
      />
    </Tabs>
  )
}
