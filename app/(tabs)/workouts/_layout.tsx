import { Stack } from 'expo-router'
import { FC } from 'react'

const WorkoutsLayout: FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add"
        options={{ presentation: 'modal', title: 'Add Workout' }}
      />
    </Stack>
  )
}

export default WorkoutsLayout
