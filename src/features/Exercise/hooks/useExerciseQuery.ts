import { useQuery } from '@tanstack/react-query'
import { exerciseQueries } from '../queries'

export const useExercisesQuery = () =>
  useQuery({
    ...exerciseQueries.list,
    gcTime: 1000 * 60 * 60 * 6,
    staleTime: Infinity,
  })
