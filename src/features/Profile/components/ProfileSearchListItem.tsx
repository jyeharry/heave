import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { Link } from 'expo-router'
import { FC } from 'react'
import { ListRenderItemInfo, Pressable, View } from 'react-native'
import { Text } from '@/components/Text'

const formatWorkoutCount = (count: number) => {
  if (count === 1) return count + ' workout'
  if (count < 100) return count + ' workouts'
  if (count < 1000) {
    return Math.floor(count / 50) * 50 + '+ workouts'
  }
  return Math.floor(count / 100) / 10 + 'k+ workouts'
}

export const ProfileSearchListItem: FC<
  ListRenderItemInfo<{
    profileID: string | null
    firstName: string | null
    lastName: string | null
    workoutCount: number | null
  }>['item']
> = ({ profileID, firstName, lastName, workoutCount }) => (
  <Link
    href={{
      pathname: '/discover/[profileID]',
      params: { profileID, firstName, lastName },
    }}
    asChild
  >
    <Pressable>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 4,
          paddingHorizontal: 8,
          gap: 16,
          alignItems: 'center',
        }}
      >
        <MCIcon
          name="account-circle"
          size={48}
          // This icon has padding, so increasing the height to match the
          // images pushes it out of alignment so we scale it up instead
          style={{ transform: [{ scale: 1 + 9 / 48 }] }}
        />
        <View style={{ gap: 2 }}>
          <Text>
            {firstName} {lastName}
          </Text>
          {!!workoutCount && (
            <Text type="metadata">{formatWorkoutCount(workoutCount)}</Text>
          )}
        </View>
      </View>
    </Pressable>
  </Link>
)
