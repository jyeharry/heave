import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { Input, InputProps } from './Input'

interface ControlledInputProps<T extends FieldValues> extends InputProps {
  name: FieldPath<T>
  control?: Control<T>
}

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  placeholder,
  ...props
}: ControlledInputProps<T>) => {
  const {
    field: { value, ...field },
  } = useController<T>({ name, control })

  return (
    <Input
      placeholder={value?.toString() || placeholder}
      {...field}
      value={value?.toString() ?? ''}
      {...props}
    />
  )
}
