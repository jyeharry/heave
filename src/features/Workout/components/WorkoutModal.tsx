import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { FC } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'
import { supabase } from '@/supabase'

export const WorkoutModal: FC<{
  visible: boolean
  setVisible: (v: boolean) => void
  lastPerformedToNow?: string | null
  profileID: string
  workoutTemplateID: string
  title: string
}> = ({
  visible,
  title,
  setVisible,
  lastPerformedToNow,
  profileID,
  workoutTemplateID,
}) => {
  const key = ['profile', profileID, 'workout', workoutTemplateID]
  const res = useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await supabase
        .from('workout_template')
        .select(
          `
            workout_template_id,
            title,
            notes,
            exercises:workout_template_exercise (
              exercise (
                exercise_id,
                name
              ),
              index,
              sets:workout_template_exercise_set (
                setType:type,
                reps,
                weight,
                index
              )
            )
          `,
        )
        .eq('workout_template_id', workoutTemplateID)
        .eq('profile_id', profileID)
        .single()

      if (res.error) throw new Error(res.error.message)
      return res.data
    },
    enabled: visible,
    gcTime: 0,
  })

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      backdropOpacity={0.5}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationOutTiming={100}
    >
      <Card
        style={{
          backgroundColor: theme.colours.grey100,
          height: '75%',
          gap: 16,
        }}
        bordered={false}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton name="close" onPress={() => setVisible(false)} />
          <Text>{title}</Text>
          <Link
            href={{
              pathname: '/workouts/[workout_template_id]/edit',
              params: { workout_template_id: workoutTemplateID },
            }}
            onPress={() => setVisible(false)}
          >
            <Text type="link">Edit</Text>
          </Link>
        </View>
        <View style={{ gap: 16 }}>
          {lastPerformedToNow && (
            <Text type="notes">Last performed: {lastPerformedToNow}</Text>
          )}
          {res.data?.notes && <Text type="notes">{res.data.notes}</Text>}
          <Link
            href={{
              pathname: '/workouts/[workout_template_id]/perform',
              params: { workout_template_id: workoutTemplateID },
            }}
            onPress={() => setVisible(false)}
            asChild
          >
            <Button>Start Workout</Button>
          </Link>
        </View>
      </Card>
    </Modal>
  )
}
