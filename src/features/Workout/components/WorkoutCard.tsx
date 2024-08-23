import Entypo from '@expo/vector-icons/Entypo'
import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import { FC, useState } from 'react'
import { Pressable, PressableProps, View } from 'react-native'
import { WorkoutModal } from './WorkoutModal'
import { workoutTemplateQueries } from '../queries'
import { Card } from '@/components/Card'
import { MenuButton, MenuOption } from '@/components/Menu'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/supabase'

export const WorkoutCard: FC<
  {
    title: string
    lastPerformed?: string | null
    workoutTemplateID: string
    authorProfileID: string
  } & PressableProps
> = ({ title, lastPerformed, workoutTemplateID, authorProfileID, style }) => {
  const [visible, setVisible] = useState(false)

  let lastPerformedToNow
  if (lastPerformed)
    lastPerformedToNow = formatDistanceToNow(lastPerformed, {
      addSuffix: true,
    })

  const queryClient = useQueryClient()
  const profile = useProfile()

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('workout_template')
        .delete()
        .eq('workout_template_id', workoutTemplateID)
      if (error) console.error('Error deleting workout', error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workoutTemplateQueries.list(profile?.profile_id!).queryKey,
      })
    },
  })

  return (
    <>
      <Pressable onPress={() => setVisible(!visible)} style={style}>
        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 8,
              alignItems: 'flex-start',
            }}
          >
            <Text style={{ flex: 1 }}>{title}</Text>
            {profile?.profile_id === authorProfileID && (
              <MenuButton
                triggerButtonChildren={
                  <Entypo name="dots-three-horizontal" size={16} />
                }
                triggerButtonProps={{
                  size: 'small',
                  colour: 'grey',
                  bordered: false,
                }}
              >
                <MenuOption text="Remove workout" onSelect={mutation.mutate} />
              </MenuButton>
            )}
          </View>
          {lastPerformed && (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
              <MCIcon
                name="clock"
                size={18}
                color={theme.text.metadata.color}
              />
              <Text type="metadata">{lastPerformedToNow}</Text>
            </View>
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
      <Skeleton height={16} width="40%" radius={4} colorMode="light" />
      <MotiView style={{ height: 5 }} />
      <MotiView>
        <Skeleton height={15} width="100%" radius={4} colorMode="light" />
        <Skeleton height={15} width="30%" radius={4} colorMode="light" />
      </MotiView>
    </Card>
  </Skeleton.Group>
)
