import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { workoutTemplateQueries } from './features/Workout'

export const queries = mergeQueryKeys(workoutTemplateQueries)
