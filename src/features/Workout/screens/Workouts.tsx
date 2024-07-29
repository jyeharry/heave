import { useQuery } from '@tanstack/react-query'
import { StyleSheet, View } from 'react-native'
import { WorkoutCard } from '../components/WorkoutCard'
import { workoutTemplateQueries } from '../queries'
import { Text } from '@/components/Text'
import { useProfile } from '@/hooks/useProfile'

export const Workouts = () => {
  const { profile_id } = useProfile()
  const { data, isFetching } = useQuery(workoutTemplateQueries.list(profile_id))

  return (
    <View style={styles.container}>
      {isFetching && <Text>Loading</Text>}
      {data?.data?.map(({ title, last_performed, workoutTemplateID }, i) => (
        <WorkoutCard
          key={i}
          title={title}
          lastPerformed={last_performed}
          workoutTemplateID={workoutTemplateID}
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
