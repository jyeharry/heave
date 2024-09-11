import { WorkoutFormSchemaType } from './types'

export const mockWorkoutData: WorkoutFormSchemaType = {
  workout_template_id: '24625f90-585e-4e63-b980-de8f18ccdab7',
  title: 'Push',
  notes: '1 second concentric, 3 second eccentric',
  exercises: [
    {
      workout_template_exercise_id: 'be8ef94f-de30-4097-8cd2-691863395e4b',
      exercise: { name: 'Bench Press', exercise_id: '0' },
      sets: [
        {
          setType: 'Warmup',
          weight: 75,
          reps: 8,
        },
        {
          setType: 'Standard',
          weight: 75,
          reps: 6,
        },
        {
          setType: 'Drop set',
          weight: 70,
          reps: 7,
        },
      ],
    },
    {
      workout_template_exercise_id: '37cd7328-d54b-4640-b484-a676f8236343',
      exercise: { name: 'Incline Dumbbell Press', exercise_id: '1' },
      sets: [
        {
          setType: 'Standard',
          weight: 25,
          reps: 10,
        },
        {
          setType: 'Standard',
          weight: 25,
          reps: 9,
        },
        {
          setType: 'Standard',
          weight: 25,
          reps: 10,
        },
      ],
    },
    {
      workout_template_exercise_id: '9470d602-8f39-49a5-9ba8-948c909835ee',
      exercise: { name: 'Chest Fly (Machine)', exercise_id: '2' },
      sets: [
        {
          setType: 'Standard',
          weight: 57.5,
          reps: 10,
        },
        {
          setType: 'Standard',
          weight: 57.5,
          reps: 9,
        },
        {
          setType: 'Standard',
          weight: 57.5,
          reps: 8,
        },
      ],
    },
  ],
}
