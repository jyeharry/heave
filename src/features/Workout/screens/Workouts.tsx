import { useQuery } from '@tanstack/react-query'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { WorkoutCard } from '../components/WorkoutCard'
import { workoutTemplateQueries } from '../queries'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'
import { useProfile } from '@/hooks/useProfile'

// TODO: remove non null assertions
export const Workouts = () => {
  const profile = useProfile()
  const { data, isFetching, refetch, isRefetching } = useQuery(
    workoutTemplateQueries.list(profile?.profile_id!),
  )

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          colors={[theme.colours.primary]}
          tintColor={theme.colours.primary}
          onRefresh={refetch}
        />
      }
    >
      {isFetching && <Text>Loading</Text>}
      {data?.data?.map(({ title, last_performed, workoutTemplateID }, i) => (
        <WorkoutCard
          key={i}
          title={title}
          lastPerformed={last_performed}
          workoutTemplateID={workoutTemplateID}
        />
      ))}
    </ScrollView>
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
