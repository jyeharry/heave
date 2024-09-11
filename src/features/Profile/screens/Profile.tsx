import { Stack, useLocalSearchParams } from 'expo-router'
import { WorkoutList } from '@/features/Workout/components/WorkoutList'

export const Profile = () => {
  const { profileID, firstName, lastName } = useLocalSearchParams<{
    profileID: string // route params are never undefined, despite what TS says
    firstName: string
    lastName: string
  }>()
  return (
    <>
      <Stack.Screen
        options={{
          title: `${firstName} ${lastName}`,
          headerShown: true,
          headerBackTitle: 'Discover',
        }}
      />
      <WorkoutList profileID={profileID!} />
    </>
  )
}
