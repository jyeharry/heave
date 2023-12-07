import { Stack } from 'expo-router'
import { FC } from 'react'
import { colours } from '@/constants/Colours'

const WorkoutsLayout: FC = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colours.light },
        headerStyle: { backgroundColor: colours.dark },
        headerTitleStyle: { color: colours.white },
        headerTintColor: colours.grey300,
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
        }}
      />
    </Stack>
  )
}

export default WorkoutsLayout
