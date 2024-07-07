import { SetTypeAbbreviation, WorkoutSchemaType } from './types'

export const mockWorkoutData: WorkoutSchemaType = {
  id: '24625f90-585e-4e63-b980-de8f18ccdab7',
  title: 'Push',
  notes: '1 second concentric, 3 second eccentric',
  exercises: [
    {
      id: 'be8ef94f-de30-4097-8cd2-691863395e4b',
      name: 'Bench Press',
      sets: [
        {
          setType: {
            name: 'Warmup',
            abbreviation: SetTypeAbbreviation.W,
          },
          previous: '70kg x 10',
          weight: 75,
          reps: 8,
        },
        {
          setType: { name: 'Standard' },
          previous: '70kg x 9',
          weight: 75,
          reps: 6,
        },
        {
          setType: {
            name: 'Drop set',
            abbreviation: SetTypeAbbreviation.D,
          },
          previous: '70kg x 8',
          weight: 70,
          reps: 7,
        },
        {
          setType: {
            name: 'Standard',
          },
        },
      ],
    },
    {
      id: '37cd7328-d54b-4640-b484-a676f8236343',
      name: 'Incline Dumbbell Press',
      sets: [
        {
          setType: { name: 'Standard' },
          previous: '25kg x 9',
          weight: 25,
          reps: 10,
        },
        {
          setType: {
            name: 'Standard',
          },
          previous: '25kg x 8',
          weight: 25,
          reps: 9,
        },
        {
          setType: {
            name: 'Standard',
          },
          previous: '25kg x 8',
          weight: 25,
          reps: 10,
        },
      ],
    },
    {
      id: '9470d602-8f39-49a5-9ba8-948c909835ee',
      name: 'Chest Fly (Machine)',
      sets: [
        {
          setType: { name: 'Standard' },
          previous: '55kg x 11',
          weight: 57.5,
          reps: 10,
        },
        {
          setType: {
            name: 'Standard',
          },
          previous: '55kg x 10',
          weight: 57.5,
          reps: 9,
        },
        {
          setType: {
            name: 'Standard',
          },
          previous: '55kg x 10',
          weight: 57.5,
          reps: 8,
        },
      ],
    },
  ],
}
