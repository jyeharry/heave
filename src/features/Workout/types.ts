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

export const WorkoutSetSchema = z.object({
  setType: SetTypeSchema,
  weight: z.coerce.number().nonnegative().default(0),
  reps: z.coerce.number().int().nonnegative().default(0),
  completed: z.optional(z.boolean().default(false)),
})

export type WorkoutSet = z.infer<typeof WorkoutSetSchema>

const ExerciseSchema = z.object({
  workout_template_exercise_id: z.string().uuid().optional(),
  exercise: z.object({
    name: z.string(),
    exercise_id: z.string().uuid(),
  }),
  sets: z.array(WorkoutSetSchema),
})

export type ExerciseSchemaType = z.infer<typeof ExerciseSchema>

export const WorkoutSchema = z.object({
  workout_template_id: z.string().uuid().optional(),
  title: z.string().min(1),
  notes: z.string().optional().nullable(),
  exercises: z.array(ExerciseSchema),
})

export type WorkoutSchemaType = z.infer<typeof WorkoutSchema>
