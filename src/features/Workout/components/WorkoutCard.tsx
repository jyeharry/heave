import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'expo-router'
import { FC, useState } from 'react'
import { Pressable, View, useWindowDimensions } from 'react-native'
import Modal from 'react-native-modal'
import { WorkoutModal } from './WorkoutModal'
import { Card } from '@/components/Card'
import { IconButton } from '@/components/IconButton'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'
import { supabase } from '@/supabase'

export const WorkoutCard: FC<{
  title: string
  lastPerformed?: string | null
  profileID: string
  workoutTemplateID: string
}> = ({ title, lastPerformed, workoutTemplateID, profileID }) => {
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
        profileID={profileID}
        workoutTemplateID={workoutTemplateID}
      />
    </>
  )
}
