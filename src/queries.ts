import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { exerciseQueries } from './features/Exercise/queries'
import { workoutTemplateQueries } from './features/Workout/queries'

export const queries = mergeQueryKeys(workoutTemplateQueries, exerciseQueries)
