import { formatDistanceToNow } from 'date-fns'
import { Link } from 'expo-router'
import { FC, useState } from 'react'
import { Pressable, View, useWindowDimensions } from 'react-native'
import Modal from 'react-native-modal'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { colours, theme } from '@/constants/theme'

export const WorkoutCard: FC<{
  title: string
  lastPerformed?: string | null
  id: string
}> = ({ title, lastPerformed, id }) => {
  const { width } = useWindowDimensions()
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Pressable
        onPress={() => setVisible(!visible)}
        style={{
          flexBasis: width / 2 - 16 * 2 + 8,
        }}
      >
        <View
          style={{
            borderRadius: 8,
            borderWidth: 1,
            padding: 16,
            gap: 4,
          }}
        >
          <Text>{title}</Text>
          {lastPerformed && (
            <Text size="notes" style={{ color: colours.grey500 }}>
              {formatDistanceToNow(lastPerformed, {
                addSuffix: true,
              })}
            </Text>
          )}
        </View>
      </Pressable>

      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={100}
      >
        <View style={{ backgroundColor: theme.colours.grey100, height: '70%' }}>
          <Text>Hello</Text>
          <Link
            href={{
              pathname: '/workouts/[workout_template_id]/edit',
              params: { workout_template_id: id },
            }}
            onPress={() => setVisible(false)}
            asChild
          >
            <Button>Edit</Button>
          </Link>
        </View>
      </Modal>
    </>
  )
}
