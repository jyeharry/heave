import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { workoutTemplateQueries } from './features/Workout/queries'
import { exerciseQueries } from './features/Exercise/queries'

export const queries = mergeQueryKeys(workoutTemplateQueries, exerciseQueries)
