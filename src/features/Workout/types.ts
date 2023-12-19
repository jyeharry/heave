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

export interface Set {
  setType: SetType
  previous?: string
  weight?: number
  reps?: number
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

export const WorkoutSchema = z.object({
  title: z.string(),
  notes: z.string().optional(),
  exercises: z.array(
    z.object({
      name: z.string(),
      sets: z.array(
        z.object({
          setType: z.object({
            name: z.nativeEnum(SetTypeName).default(SetTypeName.Standard),
            abbreviation: z.nativeEnum(SetTypeAbbreviation).optional(),
          }),
          weight: z.number().nonnegative().optional(),
          reps: z.number().nonnegative().optional(),
          completed: z.optional(z.boolean().default(false)),
        }),
      ),
    }),
  ),
})

export type WorkoutSchemaType = z.infer<typeof WorkoutSchema>
