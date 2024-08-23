import { WorkoutList } from '../components/WorkoutList'
import { useProfile } from '@/hooks/useProfile'

// TODO: remove non null assertions
export const Workouts = () => {
  const profile = useProfile()
  return <WorkoutList profileID={profile?.profile_id!} />
}
