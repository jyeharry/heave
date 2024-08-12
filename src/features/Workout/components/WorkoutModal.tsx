import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { FC } from 'react'
import { View } from 'react-native'
import { workoutTemplateQueries } from '../queries'
import { Button } from '@/components/Button'
import { IconButton } from '@/components/IconButton'
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
    gcTime: 0,
  })

  return (
    <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
      <View
        style={{
          gap: 16,
          padding: 16,
        }}
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
              pathname: '/workouts/[workoutTemplateID]/edit',
              params: { workoutTemplateID },
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
          {data?.notes && <Text type="notes">{data.notes}</Text>}
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
        </View>
      </View>
    </Modal>
  )
}
