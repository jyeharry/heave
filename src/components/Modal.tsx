import { FC } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import ReactNativeModal, { ModalProps } from 'react-native-modal'
import { theme } from '@/constants/theme'
import { ChooseRequired } from '@/types'

export const Modal: FC<
  ChooseRequired<
    Partial<ModalProps> & {
      containerStyle?: StyleProp<ViewStyle>
    },
    'children' | 'isVisible'
  >
> = ({
  children,
  backdropOpacity = 0.5,
  animationOutTiming = 100,
  animationIn = 'fadeIn',
  animationOut = 'fadeOut',
  containerStyle,
  ...props
}) => {
  return (
    <ReactNativeModal
      backdropOpacity={backdropOpacity}
      animationIn={animationIn}
      animationOut={animationOut}
      animationOutTiming={animationOutTiming}
      {...props}
    >
      <View
        style={[
          {
            borderRadius: 8,
            backgroundColor: theme.backgroundColour,
            height: '77%',
          },
          containerStyle,
        ]}
      >
        {children}
      </View>
    </ReactNativeModal>
  )
}
