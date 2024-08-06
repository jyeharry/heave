import { createQueryKeys } from '@lukemorales/query-key-factory'
import { supabase } from '@/supabase'

export const exerciseQueries = createQueryKeys('exercise', {
  list: {
    queryKey: null,
    queryFn: async () => {
      const { data } = await supabase
        .from('exercise')
        .select('name, bodyPart:body_part, exerciseID:exercise_id')
        .order('name')
      return data
    },
  },
})
