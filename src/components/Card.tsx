import { FC } from 'react'
import { View, ViewProps } from 'react-native'

export const Card: FC<ViewProps & { bordered?: boolean }> = ({
  children,
  style,
  bordered = true,
  ...props
}) => {
  return (
    <View
      style={[
        {
          borderRadius: 8,
          ...(bordered && {
            borderWidth: 1,
          }),
          padding: 16,
          gap: 4,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}
