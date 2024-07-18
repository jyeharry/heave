import { FC } from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { Text } from '@/components/Text'
import { colours } from '@/constants/theme'

export const Workouts = () => {
  return (
    <View style={styles.container}>
      <WorkoutCard title="Push" lastPerformed="5 days ago" />
      <WorkoutCard title="Pull" lastPerformed="6 days ago" />
      <WorkoutCard title="Legs" lastPerformed="7 days ago" />
    </View>
  )
}

const WorkoutCard: FC<{ title: string; lastPerformed: string }> = ({
  title,
  lastPerformed,
}) => {
  const { width } = useWindowDimensions()
  return (
    <View
      style={{
        borderRadius: 8,
        borderWidth: 1,
        padding: 16,
        gap: 4,
        flexBasis: width / 2 - 16 * 2 + 8,
      }}
    >
      <Text>{title}</Text>
      <Text size="notes" style={{ color: colours.grey500 }}>
        {lastPerformed}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
})
