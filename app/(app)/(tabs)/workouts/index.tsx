import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/Text'
import { Workouts } from '@/features/Workout'

const WorkoutsScreen = () => <Workouts />

export default WorkoutsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
