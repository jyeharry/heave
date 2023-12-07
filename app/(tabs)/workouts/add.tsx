import { Stack } from 'expo-router'
import { FC } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { colours } from '@/constants/Colours'

const Add: FC = () => {
  return (
    <View>
      <WorkoutTitle />
      <ExerciseList />
    </View>
  )
}

const WorkoutTitle = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Workout Title"
        placeholderTextColor={colours.grey300}
        style={styles.title}
      />
      <TextInput
        placeholder="Notes"
        placeholderTextColor={colours.grey300}
        style={styles.notes}
        multiline
      />
    </View>
  )
}

const ExerciseList = () => {
  return (
    <View style={styles.container}>
      <Text>Exercise List</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
      >
        <Text style={[styles.buttonText]}>Add Exercise</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colours.dark,
  },
  notes: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
    color: colours.dark,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: colours.primary100,
    borderColor: colours.primary,
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colours.primary,
  },
})

export default Add
