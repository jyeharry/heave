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
            <HeaderIcon href="/workouts/create" color={tintColor} name="plus" />
          ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'Create Workout',
        }}
      />
      <Stack.Screen
        name="[workout_template_id]/edit"
        options={{
          title: 'Edit Workout',
        }}
      />
      <Stack.Screen name="[workout_template_id]/perform" />
      <Stack.Screen
        name="add-exercise"
        options={{
          presentation: 'modal',
          title: 'Add Exercise',
          headerSearchBarOptions: {
            hideWhenScrolling: true,
          },
        }}
      />
    </Stack>
  )
}

export default WorkoutsLayout
