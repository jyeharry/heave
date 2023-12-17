import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { FC, useState } from 'react'
import { View } from 'react-native'
import { Row, Table } from 'react-native-reanimated-table'
import { SetRow } from './components/SetRow'
import { SetTypeAbbreviation, SetTypeName, Set } from './types'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'

interface ExerciseProps {
  name: string
  sets: Set[]
}

const Exercise: FC<ExerciseProps> = ({ name, sets }) => {
  const [numOfWarmups, setNumOfWarmups] = useState(
    sets.filter((set) => set.setType?.name === SetTypeName.Warmup).length,
  )

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

  return (
    <View>
      <Table style={{ rowGap: 16 }}>
        <Text>{name}</Text>
        <Row
          data={header}
          flexArr={flexArr}
          textStyle={{
            ...theme.text.body,
            textAlign: 'center',
          }}
          style={{
            height: 22,
            gap: 6,
          }}
        />
        {sets.map((set, i) => (
          <SetRow
            key={i}
            position={i + 1}
            numOfWarmups={numOfWarmups}
            setNumOfWarmups={setNumOfWarmups}
            flexArr={flexArr}
            {...set}
          />
        ))}
        <Button size="small" colour="grey">
          Add Set
        </Button>
      </Table>
    </View>
  )
}

export const ExerciseList = () => {
  const data = {
    exercises: [
      {
        name: 'Bench Press',
        sets: [
          {
            setType: {
              name: SetTypeName.Warmup,
              abbreviation: SetTypeAbbreviation.W,
            },
            previous: '70kg x 10',
            weight: 75,
            reps: 8,
          },
          {
            setType: { name: SetTypeName.Standard },
            previous: '70kg x 9',
            weight: 75,
            reps: 6,
          },
          {
            setType: {
              name: SetTypeName.Dropset,
              abbreviation: SetTypeAbbreviation.D,
            },
            previous: '70kg x 8',
            weight: 70,
            reps: 7,
          },
          {
            setType: {
              name: SetTypeName.Standard,
            },
          },
        ],
      },
    ],
  }
  const [exercises, setExercises] = useState(data.exercises)

  return (
    <View style={{ gap: 32 }}>
      {exercises.map((exercise, i) => (
        <Exercise key={i} {...exercise} />
      ))}
      <Button>Add Exercise</Button>
    </View>
  )
}
