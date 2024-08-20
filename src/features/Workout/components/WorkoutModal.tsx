import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { FC } from 'react'
import { View } from 'react-native'
import { workoutTemplateQueries } from '../queries'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { Text } from '@/components/Text'

export const WorkoutModal: FC<{
  visible: boolean
  setVisible: (v: boolean) => void
  lastPerformedToNow?: string | null
  workoutTemplateID: string
  title: string
}> = ({
  visible,
  title,
  setVisible,
  lastPerformedToNow,
  workoutTemplateID,
}) => {
  const { data } = useQuery({
    ...workoutTemplateQueries.detail(workoutTemplateID),
    enabled: visible,
  })

  return (
    <Modal
      isVisible={visible}
      setIsVisible={setVisible}
      title={title}
      Footer={
        <Link
          href={{
            pathname: '/workouts/[workoutTemplateID]/perform',
            params: { workoutTemplateID },
          }}
          onPress={() => setVisible(false)}
          asChild
        >
          <Button>Start Workout</Button>
        </Link>
      }
      HeaderRightComponent={
        <Link
          href={{
            pathname: '/workouts/[workoutTemplateID]/edit',
            params: { workoutTemplateID },
          }}
          onPress={() => setVisible(false)}
        >
          <Text type="link">Edit</Text>
        </Link>
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
