import { useQuery } from '@tanstack/react-query'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import { WorkoutCard, WorkoutCardSkeleton } from '../components/WorkoutCard'
import { workoutTemplateQueries } from '../queries'
import { theme } from '@/constants/theme'
import { useProfile } from '@/hooks/useProfile'

// TODO: remove non null assertions
export const Workouts = () => {
  const profile = useProfile()
  const { width } = useWindowDimensions()
  const { data, isFetching, refetch, isRefetching } = useQuery(
    workoutTemplateQueries.list(profile?.profile_id!),
  )
  const cardWidth = width / 2 - 16 * 2 + 8

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
      {isFetching && !data?.data && (
        <>
          <WorkoutCardSkeleton flexBasis={cardWidth} />
          <WorkoutCardSkeleton flexBasis={cardWidth} />
          <WorkoutCardSkeleton flexBasis={cardWidth} />
        </>
      )}
      {data?.data?.map(({ title, last_performed, workoutTemplateID }, i) => (
        <WorkoutCard
          key={i}
          title={title}
          lastPerformed={last_performed}
          workoutTemplateID={workoutTemplateID}
          style={{
            flexBasis: cardWidth,
          }}
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
