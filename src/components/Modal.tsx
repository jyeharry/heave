import { FC } from 'react'
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native'
import ReactNativeModal, { ModalProps } from 'react-native-modal'
import { Text } from './Text'
import { IconButton } from '@/components/IconButton'
import { theme } from '@/constants/theme'
import { ChooseRequired } from '@/types'

export const Modal: FC<
  ChooseRequired<
    Partial<ModalProps> & {
      containerStyle?: StyleProp<ViewStyle>
      header?: React.ReactNode
      hasHeader?: boolean
      title?: string
      headerRightComponent?: React.ReactElement
      setIsVisible: (v: boolean) => void
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
  header,
  hasHeader = true,
  title,
  headerRightComponent,
  setIsVisible,
  ...props
}) => {
  const Header = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
      }}
    >
      <IconButton
        name="close"
        onPress={() => setIsVisible(false)}
        style={{ marginLeft: 16, zIndex: 1 }}
      />
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Text>{title}</Text>
      </View>
      <View style={{ marginRight: 16 }}>{headerRightComponent}</View>
    </View>
  )
  return (
    <ReactNativeModal
      backdropOpacity={backdropOpacity}
      onBackdropPress={() => setIsVisible(false)}
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
            maxHeight: '80%',
          },
          containerStyle,
        ]}
      >
        {hasHeader && <Header />}
        <ScrollView>{children}</ScrollView>
      </View>
    </ReactNativeModal>
  )
}
