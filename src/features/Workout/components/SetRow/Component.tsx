import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/Octicons'
import {
  FC,
  ForwardRefExoticComponent,
  ForwardedRef,
  forwardRef,
  useRef,
  useState,
} from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { PressableProps, TextInput, TextInputProps, View } from 'react-native'
import { Row } from 'react-native-reanimated-table'
import { WorkoutSchemaType, nonStandardSetTypes } from '../../types'
import { SetTypeModal } from '../SetTypeModal'
import { SetTypeModalButton } from '../SetTypeModalButton'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'

const CompleteSetButton: FC<
  PressableProps & {
    completed: boolean
  }
> = ({ completed, onPress }) => (
  <Button
    size="none"
    colour={completed ? 'primary' : 'grey'}
    style={{ borderWidth: completed ? 1 : 0, padding: completed ? 0 : 1 }}
    onPress={onPress}
  >
    <MaterialCommunityIcons
      name="check"
      size={22}
      style={{
        textAlign: 'center',
      }}
    />
  </Button>
)

const RowInput: ForwardRefExoticComponent<TextInputProps> = forwardRef(
  ({ placeholder, value, ...props }, ref: ForwardedRef<TextInput>) => (
    <Input
      size="body"
      placeholder={placeholder}
      style={{
        height: '100%',
        textAlign: 'center',
      }}
      colour="grey"
      value={value}
      {...props}
      ref={ref}
    />
  ),
)

export const SetRow = ({
  setRowIndex,
  exerciseIndex,
  flexArr,
  previous,
  weight,
  reps,
}: {
  setRowIndex: number
  exerciseIndex: number
  flexArr: number[]
  previous?: string
  weight?: number
  reps?: number
}) => {
  const [visible, setVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const ref = useRef<View | null>(null)
  const { setValue, getValues, register } = useFormContext<WorkoutSchemaType>()
  const setFormName = `exercises.${exerciseIndex}.sets.${setRowIndex}` as const
  const completed = useWatch<WorkoutSchemaType>({
    name: `${setFormName}.completed`,
    defaultValue: getValues(`${setFormName}.completed`),
  })

  const handleOpenModal = () => {
    if (ref.current) {
      ref.current.measure((_x, _y, _width, _height, pageX, pageY) => {
        setModalPosition({ top: pageY, left: pageX })
      })
    }
    setVisible(true)
  }

  const row = [
    <View ref={ref}>
      <Button
        colour="grey"
        size="small"
        onPress={handleOpenModal}
        bordered={false}
      >
        {setRowIndex + 1}
      </Button>
    </View>,
    previous ?? (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Octicons name="dash" size={22} />
      </View>
    ),
    <RowInput
      placeholder={weight?.toString()}
      inputMode="decimal"
      {...register(`${setFormName}.weight`)}
    />,
    <RowInput
      placeholder={reps?.toString()}
      inputMode="numeric"
      {...register(`${setFormName}.reps`)}
    />,
    <CompleteSetButton
      completed={!!completed}
      onPress={() => setValue(`${setFormName}.completed`, !completed)}
    />,
  ]

  return (
    <>
      <SetTypeModal
        visible={visible}
        setVisible={setVisible}
        position={modalPosition}
      >
        {nonStandardSetTypes.map((nonStandardSetType, i, arr) => (
          <SetTypeModalButton
            key={i}
            setType={nonStandardSetType}
            setVisible={setVisible}
            top={i === 0}
            bottom={i === arr.length - 1}
          />
        ))}
      </SetTypeModal>
      <Row
        data={row}
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
    </>
  )
}
