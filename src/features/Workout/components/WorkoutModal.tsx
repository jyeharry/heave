import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { FC } from 'react'
import { View } from 'react-native'
import { workoutTemplateQueries } from '../queries'
import { WorkoutDataSchema, WorkoutFormSchemaType } from '../types'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { Text } from '@/components/Text'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/supabase'

export const WorkoutModal: FC<{
  visible: boolean
  setVisible: (v: boolean) => void
  lastPerformedToNow?: string | null
  workoutTemplateID: string
  title: string
  isOwnedByLoggedInUser: boolean
  profileID: string
}> = ({
  visible,
  title,
  setVisible,
  lastPerformedToNow,
  workoutTemplateID,
  isOwnedByLoggedInUser,
  profileID,
}) => {
  const profile = useProfile()
  const loggedInProfileID = profile?.profile_id!
  const { data } = useQuery({
    ...workoutTemplateQueries.detail(workoutTemplateID, loggedInProfileID),
    enabled: visible,
  })

  const queryClient = useQueryClient()

  const copyWorkoutMutation = useMutation({
    mutationFn: async (data: WorkoutFormSchemaType) => {
      const parsedData = WorkoutDataSchema.parse({
        title: data.title,
        notes: data.notes,
        mode: 'create',
        profileID: loggedInProfileID,
        authorProfileID: profileID,
        exercises: data.exercises,
        parentWorkoutTemplateID: data.workoutTemplateID,
      })
      const { error } = await supabase.rpc('upsert_workout', {
        payload: parsedData,
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workoutTemplateQueries.list(loggedInProfileID).queryKey,
      })
    },
    onError: (error) => {
      console.error('Error updating workout', error)
    },
  })

  return (
    <Modal
      isVisible={visible}
      setIsVisible={setVisible}
      title={title}
      Footer={
        !isOwnedByLoggedInUser ? (
          <Button
            colour="primary"
            onPress={() =>
              copyWorkoutMutation.mutate(data as WorkoutFormSchemaType)
            }
            disabled={!data}
          >
            Save Workout
          </Button>
        ) : (
          <Link
            href={{
              pathname: '/workouts/[workoutTemplateID]/perform',
              params: { workoutTemplateID },
            }}
            onPress={() => setVisible(false)}
            disabled={!data}
            asChild
          >
            <Button>Start Workout</Button>
          </Link>
        )
      }
      HeaderRightComponent={
        isOwnedByLoggedInUser && (
          <Link
            href={{
              pathname: '/workouts/[workoutTemplateID]/edit',
              params: { workoutTemplateID },
            }}
            onPress={() => setVisible(false)}
          >
            <Text type="link">Edit</Text>
          </Link>
        )
      }
    >
      <View
        style={{
          gap: 16,
          padding: 16,
          paddingTop: 0,
        }}
      >
        <View style={{ gap: 16, justifyContent: 'space-between' }}>
          <View style={{ gap: 16 }}>
            {lastPerformedToNow && (
              <Text type="notes">Last performed: {lastPerformedToNow}</Text>
            )}
            {data?.notes && <Text type="notes">{data.notes}</Text>}
            <View style={{ gap: 8 }}>
              {data?.exercises.map((ex, i) => (
                <Text key={i} type="notes">
                  {ex.sets.filter((set) => set.setType !== 'Warmup').length} x{' '}
                  {ex.exercise?.name}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
