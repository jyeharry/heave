import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { Tabs } from 'expo-router'
import HeaderIcon from '@/components/HeaderIcon'
import { theme } from '@/constants/theme'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon = (props: { source: any; color: string }) => (
  <MCIcon size={28} name={props.source} type="material-community" {...props} />
)

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
            <HeaderIcon href="/modal" color={tintColor} name="information" />
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
            <HeaderIcon href="/workouts/add" color={tintColor} name="plus" />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <TabBarIcon source="account" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
