import { FC } from 'react'
import { Control, useController } from 'react-hook-form'
import { Input, InputProps } from './Input'

interface ControlledInputProps extends InputProps {
  name: string
  control?: Control<any>
  showValue?: boolean
}

export const ControlledInput: FC<ControlledInputProps> = ({
  name,
  control,
  showValue,
  placeholder,
  ...props
}) => {
  const { field } = useController({ name, control })

  return (
    <Input
      placeholder={field.value?.toString() || placeholder}
      {...field}
      value={field.value?.toString() ?? ''}
      {...props}
    />
  )
}
