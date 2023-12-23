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
  ...props
}) => {
  const {
    field: { value, ...field },
  } = useController({ name, control })

  return (
    <Input
      placeholder={value?.toString()}
      {...field}
      value={showValue && value?.toString()}
      {...props}
    />
  )
}
