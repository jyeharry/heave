import { useQuery } from '@tanstack/react-query'
import { StyleSheet, View } from 'react-native'
import { WorkoutCard } from '../components/WorkoutCard'
import { Text } from '@/components/Text'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/supabase'

export const Workouts = () => {
  const { profile_id } = useProfile()
  const { data, isFetching } = useQuery({
    queryKey: ['profile', profile_id, 'workouts'],
    queryFn: async () => {
      return supabase
        .from('workout_template')
        .select('workout_template_id, title, updated_at')
        .eq('profile_id', profile_id)
    },
  })

  return (
    <View style={styles.container}>
      {isFetching && <Text>Loading</Text>}
      {data?.data?.map(({ title, updated_at, workout_template_id }) => (
        <WorkoutCard
          key={workout_template_id}
          title={title}
          lastPerformed={updated_at}
          id={workout_template_id}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
})
