import { Modal, Pressable, View } from 'react-native'
import { theme } from '@/constants/theme'

export const SetTypeModal = ({
  visible,
  setVisible,
  position,
  children,
}: {
  children: React.ReactNode
  visible: boolean
  setVisible: (visible: boolean) => void
  position: { top: number; left: number }
}) => (
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
        {children}
      </View>
    </Pressable>
  </Modal>
)
