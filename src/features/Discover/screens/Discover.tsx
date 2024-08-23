import { FlashList } from '@shopify/flash-list'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { FC, useState } from 'react'
import { View } from 'react-native'
import { discoverQueries, discoverSearch } from '../queries'
import { theme } from '@/constants/theme'
import { ProfileSearchListItem } from '@/features/Profile/components/ProfileSearchListItem'

export const Discover: FC = () => {
  const [filter, setFilter] = useState('')
  const { fetchNextPage, data } = useInfiniteQuery({
    queryKey: discoverQueries.search(filter).queryKey,
    queryFn: discoverSearch,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.data.length < 20 ? null : lastPageParam + 1,
  })

  return (
    <View style={{ height: '100%' }}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            onChangeText: (e) => setFilter(e.nativeEvent.text),
            barTintColor: theme.colours.light,
            autoFocus: true,
            hideWhenScrolling: false,
          },
        }}
      />
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingVertical: 4 }}
        data={data?.pages.flatMap((page) => page.data).flat()}
        estimatedItemSize={56}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.05}
        renderItem={({ item }) => <ProfileSearchListItem {...item} />}
      />
    </View>
  )
}
