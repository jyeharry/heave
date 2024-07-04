import { z } from 'zod'

export enum SetTypeAbbreviation {
  W,
  D,
}

const SetTypeNameSchema = z.enum(['Warmup', 'Drop set', 'Standard'])
export type SetTypeName = z.infer<typeof SetTypeNameSchema>

const SetTypeSchema = z
  .object({
    name: SetTypeNameSchema,
    abbreviation: z.nativeEnum(SetTypeAbbreviation).optional(),
  })
  .default({ name: 'Standard' })

export type SetType = z.infer<typeof SetTypeSchema>

export const nonStandardSetTypes: SetType[] = [
  {
    name: 'Warmup',
    abbreviation: SetTypeAbbreviation.W,
  },
  {
    name: 'Drop set',
    abbreviation: SetTypeAbbreviation.D,
  },
]

export const WorkoutSetSchema = z.object({
  setType: SetTypeSchema,
  previous: z.string().optional(),
  weight: z.number().nonnegative().default(0).optional(),
  reps: z.number().nonnegative().default(0).optional(),
  completed: z.optional(z.boolean().default(false)),
})

export type WorkoutSet = z.infer<typeof WorkoutSetSchema>

const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  sets: z.array(WorkoutSetSchema),
})

export type ExerciseSchemaType = z.infer<typeof ExerciseSchema>

export const WorkoutSchema = z.object({
  id: z.string(),
  title: z.string(),
  notes: z.string().optional(),
  exercises: z.array(ExerciseSchema),
})

export type WorkoutSchemaType = z.infer<typeof WorkoutSchema>
