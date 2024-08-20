import { createQueryKeys, inferQueryKeys } from '@lukemorales/query-key-factory'
import { QueryFunctionContext } from '@tanstack/react-query'
import { supabase } from '@/supabase'

export const discoverQueries = createQueryKeys('discover', {
  search: (name: string) => ({
    queryKey: [name],
  }),
})

type DiscoverKeys = inferQueryKeys<typeof discoverQueries>

// TODO: Can't figure out how to correctly put this function in the query key factory
export const discoverSearch = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<DiscoverKeys['search']['queryKey'], number>) => {
  const data = await supabase
    .rpc('discover_search', { name: queryKey[2] })
    .select(
      `
        profileID:profile_id,
        firstName:first_name,
        lastName:last_name,
        workoutCount:workout_count
      `,
    )
    .range(pageParam * 20, pageParam * 20 + 19)

  if (data.error) throw new Error(data.error.message)
  return data
}
