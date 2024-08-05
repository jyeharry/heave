import { createQueryKeys } from '@lukemorales/query-key-factory'
import { supabase } from '@/supabase'

export const workoutTemplateQueries = createQueryKeys('workout-template', {
  detail: (workoutTemplateID: string) => ({
    queryKey: [workoutTemplateID],
    queryFn: async () => {
      const res = await supabase
        .from('workout_template')
        .select(
          `
            workoutTemplateID:workout_template_id,
            title,
            notes,
            lastPerformed:last_performed,
            exercises:workout_template_exercise (
              workoutTemplateExerciseID:workout_template_exercise_id,
              exercise (
                exerciseID:exercise_id,
                name
              ),
              index,
              sets:workout_template_exercise_set (
                setType:type,
                reps,
                weight,
                index
              )
            )
          `,
        )
        .eq('workout_template_id', workoutTemplateID)
        .single()

      if (res.error) throw new Error(res.error.message)
      return res.data
    },
  }),
  list: (profileID: string) => ({
    queryKey: [profileID],
    queryFn: async () => {
      return supabase
        .from('workout_template')
        .select('workoutTemplateID:workout_template_id, title, last_performed')
        .eq('profile_id', profileID)
    },
  }),
})
