import { StyleSheet } from 'react-native'
import { colours } from './colours'

export const theme = {
  colours,
  placeholderColour: colours.grey300,
  text: StyleSheet.create({
    body: {
      fontSize: 16,
      fontWeight: '600',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  }),
}
