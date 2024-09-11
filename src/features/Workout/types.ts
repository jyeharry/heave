import { z } from 'zod'

export enum SetTypeAbbreviation {
  W,
  D,
}

export type WorkoutMode = 'create' | 'edit' | 'perform'

const SetTypeSchema = z.enum(['Warmup', 'Drop set', 'Standard'])

export type SetType = z.infer<typeof SetTypeSchema>
export type NonStandardSetType = Exclude<SetType, 'Standard'>

export const nonStandardSetTypes: NonStandardSetType[] = ['Warmup', 'Drop set']
export const setTypeAbbreviationMap: Partial<Record<SetType, string>> = {
  Warmup: 'W',
  'Drop set': 'D',
}

export type WorkoutParams = {
  workoutTemplateID: string
  newExerciseName?: string
  newExerciseID?: string
  workoutExerciseCount?: `${number}`
  action?: 'add' | 'replace'
  exerciseIndex?: `${number}`
}

export const WorkoutSetFormSchema = z.object({
  setType: SetTypeSchema,
  weight: z.coerce.number().nonnegative().optional(),
  reps: z.coerce.number().int().nonnegative().optional(),
  completed: z.optional(z.boolean().default(false)),
  index: z.number().int().nonnegative(),
})

export type WorkoutSetFormType = z.infer<typeof WorkoutSetFormSchema>

export const WorkoutSetDataSchema = WorkoutSetFormSchema.extend({
  weight: WorkoutSetFormSchema.shape.weight.default(0),
  reps: WorkoutSetFormSchema.shape.reps.default(0),
})

export type WorkoutSetDataType = z.infer<typeof WorkoutSetDataSchema>

const ExerciseFormSchema = z.object({
  workoutTemplateExerciseID: z.string().uuid().optional(),
  exercise: z.object({
    name: z.string(),
    exerciseID: z.string().uuid(),
  }),
  index: z.number().int().nonnegative(),
  sets: z.array(WorkoutSetFormSchema),
})

export type ExerciseFormSchemaType = z.infer<typeof ExerciseFormSchema>

const ExerciseDataSchema = ExerciseFormSchema.extend({
  sets: z.array(WorkoutSetDataSchema),
})

export type ExerciseDataSchemaType = z.infer<typeof ExerciseDataSchema>

export const WorkoutFormSchema = z.object({
  title: z.string().transform((val) => val || 'Untitled Workout'),
  notes: z.string().optional().nullable(),
  workoutTemplateID: z.string().uuid().optional(),
  exercises: z.array(ExerciseFormSchema),
  authorProfileID: z.string().uuid(),
  parentWorkoutTemplateID: z.string().uuid().nullish(),
})

export type WorkoutFormSchemaType = z.infer<typeof WorkoutFormSchema>

export const WorkoutDataSchema = WorkoutFormSchema.extend({
  mode: z.enum(['create', 'edit', 'perform']),
  lastPerformed: z.string().datetime().optional(),
  exercises: z.array(ExerciseDataSchema),
  profileID: z.string().uuid(),
}).strict()

export type WorkoutDataSchemaType = z.infer<typeof WorkoutDataSchema>
