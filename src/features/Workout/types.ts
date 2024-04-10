import { z } from 'zod'

export enum SetTypeAbbreviation {
  W,
  D,
}

export enum SetTypeName {
  Warmup,
  Dropset,
  Standard,
}

export interface SetType {
  name: SetTypeName
  abbreviation?: SetTypeAbbreviation
}

export const nonStandardSetTypes: SetType[] = [
  {
    name: SetTypeName.Warmup,
    abbreviation: SetTypeAbbreviation.W,
  },
  {
    name: SetTypeName.Dropset,
    abbreviation: SetTypeAbbreviation.D,
  },
]

export const WorkoutSetSchema = z.object({
  setType: z
    .object({
      name: z.nativeEnum(SetTypeName).default(SetTypeName.Standard),
      abbreviation: z.nativeEnum(SetTypeAbbreviation).optional(),
    })
    .default({ name: SetTypeName.Standard }),
  previous: z.string().optional(),
  weight: z.number().nonnegative().optional(),
  reps: z.number().nonnegative().optional(),
  completed: z.optional(z.boolean().default(false)),
})

export type WorkoutSet = z.infer<typeof WorkoutSetSchema>

export const WorkoutSchema = z.object({
  title: z.string(),
  notes: z.string().optional(),
  exercises: z.array(
    z.object({
      name: z.string(),
      sets: z.array(WorkoutSetSchema),
    }),
  ),
})

export type WorkoutSchemaType = z.infer<typeof WorkoutSchema>
