import { Stack } from 'expo-router'
import { FC } from 'react'
import { theme } from '@/constants/theme'

const WorkoutsLayout: FC = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colours.dark },
        headerTitleStyle: { color: theme.colours.white },
        headerTintColor: theme.colours.grey300,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          presentation: 'modal',
          title: 'Add Workout',
          contentStyle: {
            flex: 1,
          },
        }}
      />
    </Stack>
  )
}

export default WorkoutsLayout
