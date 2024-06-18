import { router, useLocalSearchParams } from 'expo-router'
import { FC } from 'react'
import { View } from 'react-native'
import { Button } from '@/components/Button'

const AddExercise: FC = () => {
  const { exerciseCount } = useLocalSearchParams<{
    newExercise: string
    exerciseCount: string
  }>()
  return (
    <View>
      <Button
        onPress={() =>
          router.navigate({
            pathname: '/(app)/(tabs)/workouts/add',
            params: { newExercise: 'red', exerciseCount },
          })
        }
      >
        Red
      </Button>
      <Button
        onPress={() =>
          router.navigate({
            pathname: '/(app)/(tabs)/workouts/add',
            params: { newExercise: 'blue', exerciseCount },
          })
        }
      >
        Blue
      </Button>
    </View>
  )
}

export default AddExercise
