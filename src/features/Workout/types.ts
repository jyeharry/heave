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
  mode?: 'add' | 'replace'
  exerciseIndex?: `${number}`
}

export const WorkoutSetSchema = z.object({
  setType: SetTypeSchema,
  weight: z.coerce.number().nonnegative().default(0),
  reps: z.coerce.number().int().nonnegative().default(0),
  completed: z.optional(z.boolean().default(false)),
  index: z.number().int().nonnegative(),
})

export type WorkoutSet = z.infer<typeof WorkoutSetSchema>

const ExerciseSchema = z.object({
  workoutTemplateExerciseID: z.string().uuid().optional(),
  exercise: z.object({
    name: z.string(),
    exerciseID: z.string().uuid(),
  }),
  index: z.number().int().nonnegative(),
  sets: z.array(WorkoutSetSchema),
})

export type ExerciseSchemaType = z.infer<typeof ExerciseSchema>

export const WorkoutSchema = z
  .object({
    title: z.string().transform((val) => (val ? val : 'Untitled Workout')),
    notes: z.string().optional().nullable(),
    mode: z.enum(['create', 'edit', 'perform']),
    workoutTemplateID: z.string().uuid().optional(),
    lastPerformed: z.string().datetime().optional(),
    exercises: z.array(ExerciseSchema),
  })
  .strict()

export type WorkoutSchemaType = z.infer<typeof WorkoutSchema>
