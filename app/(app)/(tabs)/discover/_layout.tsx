import { Stack } from 'expo-router'
import { FC } from 'react'
import { theme } from '@/constants/theme'

const DiscoverLayout: FC = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colours.dark },
        contentStyle: { backgroundColor: theme.colours.grey100 },
        headerTitleStyle: { color: theme.colours.white },
        headerTintColor: theme.colours.grey300,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Discover Profiles',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[profileID]"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  )
}

export default DiscoverLayout
