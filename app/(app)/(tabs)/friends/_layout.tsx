import { Stack } from 'expo-router'
import { FC } from 'react'
import { theme } from '@/constants/theme'

const FriendsLayout: FC = () => {
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
          title: 'Friends',
          headerShown: true,
        }}
      />
    </Stack>
  )
}

export default FriendsLayout
