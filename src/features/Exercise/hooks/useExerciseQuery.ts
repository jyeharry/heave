import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/supabase'

export const useExercisesQuery = () =>
  useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      const { data } = await supabase.from('exercise').select()
      return data
    },
  })
