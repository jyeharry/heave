import { Stack } from 'expo-router'
import { FC, useState } from 'react'
import { View } from 'react-native'
import { theme } from '@/constants/theme'

export const Friends: FC = () => {
  const [filter, setFilter] = useState('')
  return (
    <View>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            onChangeText: (e) => setFilter(e.nativeEvent.text),
            barTintColor: theme.colours.light,
          },
        }}
      />
    </View>
  )
}
