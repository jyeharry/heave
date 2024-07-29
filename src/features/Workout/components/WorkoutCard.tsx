import { formatDistanceToNow } from 'date-fns'
import { FC, useState } from 'react'
import { Pressable, useWindowDimensions } from 'react-native'
import { WorkoutModal } from './WorkoutModal'
import { Card } from '@/components/Card'
import { Text } from '@/components/Text'

export const WorkoutCard: FC<{
  title: string
  lastPerformed?: string | null
  workoutTemplateID: string
}> = ({ title, lastPerformed, workoutTemplateID }) => {
  const { width } = useWindowDimensions()
  const [visible, setVisible] = useState(false)

  let lastPerformedToNow
  if (lastPerformed)
    lastPerformedToNow = formatDistanceToNow(lastPerformed, {
      addSuffix: true,
    })

  return (
    <>
      <Pressable
        onPress={() => setVisible(!visible)}
        style={{
          flexBasis: width / 2 - 16 * 2 + 8,
        }}
      >
        <Card>
          <Text>{title}</Text>
          {lastPerformed && <Text type="notes">{lastPerformedToNow}</Text>}
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
