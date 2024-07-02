import { SetTypeAbbreviation, SetTypeName, WorkoutSchemaType } from './types'

export const mockWorkoutData: WorkoutSchemaType = {
  id: '0',
  title: 'Push',
  notes: '1 second concentric, 3 second eccentric',
  exercises: [
    {
      id: '1',
      name: 'Bench Press',
      sets: [
        {
          setType: {
            name: SetTypeName.Warmup,
            abbreviation: SetTypeAbbreviation.W,
          },
          previous: '70kg x 10',
          weight: 75,
          reps: 8,
        },
        {
          setType: { name: SetTypeName.Standard },
          previous: '70kg x 9',
          weight: 75,
          reps: 6,
        },
        {
          setType: {
            name: SetTypeName["Drop Set"],
            abbreviation: SetTypeAbbreviation.D,
          },
          previous: '70kg x 8',
          weight: 70,
          reps: 7,
        },
        {
          setType: {
            name: SetTypeName.Standard,
          },
        },
      ],
    },
    {
      id: '2',
      name: 'Incline Dumbbell Press',
      sets: [
        {
          setType: { name: SetTypeName.Standard },
          previous: '25kg x 9',
          weight: 25,
          reps: 10,
        },
        {
          setType: {
            name: SetTypeName.Standard,
          },
          previous: '25kg x 8',
          weight: 25,
          reps: 9,
        },
        {
          setType: {
            name: SetTypeName.Standard,
          },
          previous: '25kg x 8',
          weight: 25,
          reps: 10,
        },
      ],
    },
    {
      id: '3',
      name: 'Chest Fly (Machine)',
      sets: [
        {
          setType: { name: SetTypeName.Standard },
          previous: '55kg x 11',
          weight: 57.5,
          reps: 10,
        },
        {
          setType: {
            name: SetTypeName.Standard,
          },
          previous: '55kg x 10',
          weight: 57.5,
          reps: 9,
        },
        {
          setType: {
            name: SetTypeName.Standard,
          },
          previous: '55kg x 10',
          weight: 57.5,
          reps: 8,
        },
      ],
    },
  ],
}
