import { FlashList } from '@shopify/flash-list'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getLocales } from 'expo-localization'
import { Stack } from 'expo-router'
import { FC, useState } from 'react'
import { View } from 'react-native'
import { discoverQueries, discoverSearch } from '../queries'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'

export const Discover: FC = () => {
  const [filter, setFilter] = useState('')
  const { fetchNextPage, data } = useInfiniteQuery({
    queryKey: discoverQueries.search(filter).queryKey,
    queryFn: discoverSearch,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.data.length < 20 ? null : lastPageParam + 1,
  })

  console.log(`(1234).toLocaleString(${getLocales()[0].languageTag}, {
    maximumFractionDigits: 1,
    notation: 'compact',
  })`)
  const number = (1234).toLocaleString(getLocales()[0].languageTag, {
    maximumFractionDigits: 1,
    notation: 'compact',
  })
  console.log('number', number)
  console.log('locales', JSON.stringify(getLocales(), null, 2))
  console.log('languageTag', getLocales()[0].languageTag)
  return (
    <>
      <View style={{ height: '100%' }}>
        <Stack.Screen
          options={{
            headerSearchBarOptions: {
              onChangeText: (e) => setFilter(e.nativeEvent.text),
              barTintColor: theme.colours.light,
              autoFocus: true,
            },
          }}
        />
        <FlashList
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingVertical: 4 }}
          data={data?.pages.flatMap((page) => page.data).flat()}
          estimatedItemSize={100}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.05}
          renderItem={({ item }) => {
            const formatCount = (count: number) => {
              if (count === 1) return count + ' workout'
              if (count < 100) return count + ' workouts'
              if (count < 1000) {
                return Math.floor(count / 50) * 50 + '+ workouts'
              }
              return Math.floor(count / 1e2) / 10 + 'k+ workouts'
            }
            return (
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    borderRadius: 24,
                    height: 48,
                    aspectRatio: 1,
                    backgroundColor: 'blue',
                  }}
                />
                <View style={{ gap: 2 }}>
                  <Text>
                    {item.firstName} {item.lastName}
                  </Text>
                  {!!item.workoutCount && (
                    <Text type="metadata">{formatCount(item.workoutCount)}</Text>
                  )}
                </View>
              </View>
            )
          }}
        />
      </View>
    </>
  )
}
