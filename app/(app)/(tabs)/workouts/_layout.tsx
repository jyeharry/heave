import { Stack } from 'expo-router'
import { FC } from 'react'
import HeaderIcon from '@/components/HeaderIcon'
import { theme } from '@/constants/theme'

const WorkoutsLayout: FC = () => {
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
          title: 'Workouts',
          headerShown: true,
          headerRight: ({ tintColor }) => (
            <HeaderIcon href="/workouts/add" color={tintColor} name="plus" />
          ),
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'Add Workout',
        }}
      />
      <Stack.Screen
        name="add-exercise"
        options={{
          presentation: 'modal',
          title: 'Add Exercise',
        }}
      />
    </Stack>
  )
}

export default WorkoutsLayout
