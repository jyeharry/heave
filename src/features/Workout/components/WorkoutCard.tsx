import { formatDistanceToNow } from 'date-fns'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import { FC, useState } from 'react'
import { Pressable, PressableProps } from 'react-native'
import { WorkoutModal } from './WorkoutModal'
import { Card } from '@/components/Card'
import { Text } from '@/components/Text'

export const WorkoutCard: FC<
  {
    title: string
    lastPerformed?: string | null
    workoutTemplateID: string
  } & PressableProps
> = ({ title, lastPerformed, workoutTemplateID, style }) => {
  const [visible, setVisible] = useState(false)

  let lastPerformedToNow
  if (lastPerformed)
    lastPerformedToNow = formatDistanceToNow(lastPerformed, {
      addSuffix: true,
    })

  return (
    <>
      <Pressable onPress={() => setVisible(!visible)} style={style}>
        <Card>
          <Text>{title}</Text>
          {lastPerformed && (
            <Text type="notes" style={{ fontSize: 15 }}>
              {lastPerformedToNow}
            </Text>
          )}
        </Card>
      </Pressable>

      <WorkoutModal
        setVisible={setVisible}
        visible={visible}
        title={title}
        lastPerformedToNow={lastPerformedToNow}
        workoutTemplateID={workoutTemplateID}
      />
    </>
  )
}

export const WorkoutCardSkeleton: FC<{ flexBasis: number }> = ({
  flexBasis,
}) => (
  <Skeleton.Group show>
    <Card
      style={{
        flexBasis,
      }}
    >
      <Skeleton height={16} width="40%" radius="square" colorMode="light" />
      <MotiView style={{ height: 5 }} />
      <MotiView>
        <Skeleton height={15} width="100%" radius="square" colorMode="light" />
        <Skeleton height={15} width="30%" radius="square" colorMode="light" />
      </MotiView>
    </Card>
  </Skeleton.Group>
)
