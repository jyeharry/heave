import { StyleSheet } from 'react-native'
import { colours } from './colours'

export const theme = {
  colours,
  placeholderColour: colours.grey300,
  backgroundColour: colours.grey100,
  text: StyleSheet.create({
    body: {
      fontSize: 16,
      fontWeight: '700',
    },
    link: {
      fontSize: 16,
      color: colours.info,
    },
    notes: {
      fontSize: 16,
      fontWeight: '600',
      color: colours.grey900,
    },
    metadata: {
      fontSize: 14,
      fontWeight: '600',
      color: colours.grey600,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  }),
}
