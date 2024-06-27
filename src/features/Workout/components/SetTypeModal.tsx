import { useFormContext, useWatch } from 'react-hook-form'
import { Modal, Pressable, View } from 'react-native'
import {
  SetType,
  SetTypeName,
  WorkoutSchemaType,
  nonStandardSetTypes,
} from '../types'
import { Button } from '@/components/Button'
import { theme } from '@/constants/theme'

export const SetTypeModal = ({
  visible,
  setVisible,
  position,
  formSetName,
}: {
  visible: boolean
  setVisible: (visible: boolean) => void
  position: { top: number; left: number }
  formSetName: `exercises.${number}.sets.${number}`
}) => {
  const { setValue } = useFormContext<WorkoutSchemaType>()
  const setType = useWatch<WorkoutSchemaType>({
    name: `${formSetName}.setType`,
    defaultValue: { name: SetTypeName.Standard },
  }) as SetType

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
        onPress={() => setVisible(false)}
      >
        <View
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: theme.colours.grey150,
            position: 'absolute',
            top: position.top,
            left: position.left,
          }}
        >
          {nonStandardSetTypes.map((nonStandardSetType, i) => {
            const selected = setType?.name === nonStandardSetType.name
            return (
              <Button
                key={i}
                style={[selected && { backgroundColor: theme.colours.grey200 }]}
                size="large"
                colour="grey"
                bordered={false}
                onPress={() => {
                  setValue(
                    `${formSetName}.setType`,
                    selected
                      ? { name: SetTypeName.Standard }
                      : nonStandardSetType,
                  )
                  setVisible(false)
                }}
              >
                {SetTypeName[nonStandardSetType.name]}
              </Button>
            )
          })}
        </View>
      </Pressable>
    </Modal>
  )
}
