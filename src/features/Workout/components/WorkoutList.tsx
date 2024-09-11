import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
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

export const WorkoutList: FC<{ profileID: string }> = ({ profileID }) => {
  const { width } = useWindowDimensions()
  const { data, isFetching, refetch, isRefetching } = useQuery(
    workoutTemplateQueries.list(profileID),
  )
  const cardWidth = width / 2 - 16 * 2 + 8
  const profile = useProfile()
  const isOwnedByLoggedInUser = profile?.profile_id === profileID

  const workoutsOwnedByProfile = data?.data?.filter(
    (workout) => workout.authorProfileID === profileID,
  )
  const workoutsNotOwnedByProfile = data?.data?.filter(
    (workout) => workout.authorProfileID !== profileID,
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
          isOwnedByLoggedInUser={isOwnedByLoggedInUser}
          profileID={profileID}
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
