import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import Color from 'color'
import { FC } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Table, Row } from 'react-native-reanimated-table'
import { Button } from '@/components/Button'
import Input from '@/components/Input'
import { theme } from '@/constants/theme'

const Add: FC = () => {
  return (
    <View style={styles.container}>
      <WorkoutTitle />
      <ExerciseList />
      <Button style={{ marginTop: 16 }} colour="danger">
        Cancel Workout
      </Button>
    </View>
  )
}

const WorkoutTitle = () => {
  return (
    <View>
      <Input placeholder="Workout Title" size="title" />
      <Input
        placeholder="Notes"
        style={[theme.text.notes, styles.notes]}
        multiline
      />
    </View>
  )
}

const ExerciseList = () => {
  const header = [
    'Set',
    'Previous',
    'kg',
    'Reps',
    <MCIcon
      name="check"
      size={22}
      style={{
        textAlign: 'center',
      }}
    />,
  ]
  const flexArr = [1, 4, 2, 2, 1]
  const rowData = [
    1,
    '40kg x 10',
    45,
    10,
    <Pressable
      style={{
        borderRadius: 8,
        backgroundColor: Color(theme.colours.grey).lightness(90).toString(),
      }}
    >
      {({ pressed }) => (
        <MCIcon
          name="check"
          size={22}
          style={{
            textAlign: 'center',
            opacity: pressed ? 0.5 : 1,
          }}
          iconStyle={{
            color: 'black',
          }}
        />
      )}
    </Pressable>,
  ]

  return (
    <View style={{ marginTop: 16 }}>
      <Table style={{ rowGap: 8 }}>
        <Row
          data={header}
          flexArr={flexArr}
          textStyle={{
            ...theme.text.body,
            textAlign: 'center',
          }}
          style={{
            gap: 6,
          }}
        />
        <Row
          data={rowData}
          flexArr={flexArr}
          textStyle={{
            ...theme.text.body,
            textAlign: 'center',
          }}
          style={{
            gap: 6,
          }}
        />
      </Table>
      <Button style={{ marginTop: 32 }}>Add Exercise</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  notes: {
    marginTop: 8,
  },
})

export default Add
