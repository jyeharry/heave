import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { FC } from 'react'
import { useFieldArray } from 'react-hook-form'
import { View } from 'react-native'
import { Row, Table } from 'react-native-reanimated-table'
import { SetTypeName, WorkoutSchemaType } from '../../types'
import { SetRow } from '../SetRow'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'

interface ExerciseProps {
  name: string
  exerciseIndex: number
}

export const Exercise: FC<ExerciseProps> = ({ name, exerciseIndex }) => {
  const { fields: setFields, append } = useFieldArray<WorkoutSchemaType>({
    name: `exercises.${exerciseIndex}.sets`,
  })

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
        {setFields.map((set, i) => (
          <SetRow
            key={set.id}
            exerciseIndex={exerciseIndex}
            setRowIndex={i}
            flexArr={flexArr}
          />
        ))}
        <Button
          size="small"
          colour="grey"
          onPress={() =>
            append(
              {
                setType: { name: SetTypeName.Standard },
              },
              { shouldFocus: false },
            )
          }
        >
          Add Set
        </Button>
      </Table>
    </View>
  )
}
