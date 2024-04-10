import { useFormContext, useWatch } from 'react-hook-form'
import { Modal, Pressable, View } from 'react-native'
import {
  SetType,
  SetTypeName,
  WorkoutSchemaType,
  nonStandardSetTypes,
} from '../../types'
import { SetTypeModalButton } from '../SetTypeModalButton'
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
        }}
        onPress={() => setVisible(false)}
      >
        <View
          style={{
            borderRadius: 16,
            backgroundColor: theme.colours.grey150,
            position: 'absolute',
            top: position.top,
            left: position.left,
          }}
        >
          {nonStandardSetTypes.map((nonStandardSetType, i, arr) => {
            const selected = setType?.name === nonStandardSetType.name
            return (
              <SetTypeModalButton
                key={i}
                setType={nonStandardSetType}
                selected={selected}
                onPress={() => {
                  setValue(
                    `${formSetName}.setType`,
                    selected
                      ? { name: SetTypeName.Standard }
                      : nonStandardSetType,
                  )
                  setVisible(false)
                }}
                top={i === 0}
                bottom={i === arr.length - 1}
              />
            )
          })}
        </View>
      </Pressable>
    </Modal>
  )
}
