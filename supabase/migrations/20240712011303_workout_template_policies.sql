drop policy "Enable insert for users based on user_id" on "public"."workout_template_exercise_set";

create policy "Enable update for users based on profile_id"
on "public"."workout_template"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = profile_id))
with check ((( SELECT auth.uid() AS uid) = profile_id));


create policy "Enable insert for users based on profile_id"
on "public"."workout_template_exercise"
as permissive
for insert
to public
with check ((workout_template_id IN ( SELECT workout_template.workout_template_id
   FROM (profile
     JOIN workout_template USING (profile_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))));


create policy "Enable update for users based on profile_id"
on "public"."workout_template_exercise"
as permissive
for update
to public
using ((workout_template_id IN ( SELECT workout_template.workout_template_id
   FROM (profile
     JOIN workout_template USING (profile_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))))
with check ((workout_template_id IN ( SELECT workout_template.workout_template_id
   FROM (profile
     JOIN workout_template USING (profile_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))));


create policy "Enable insert for users based on profile_id"
on "public"."workout_template_exercise_set"
as permissive
for insert
to authenticated
with check ((workout_template_exercise_id IN ( SELECT workout_template_exercise.workout_template_exercise_id
   FROM ((profile
     JOIN workout_template USING (profile_id))
     JOIN workout_template_exercise USING (workout_template_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))));


create policy "Enable update for users based on profile_id"
on "public"."workout_template_exercise_set"
as permissive
for update
to public
using ((workout_template_exercise_id IN ( SELECT workout_template_exercise.workout_template_exercise_id
   FROM ((profile
     JOIN workout_template USING (profile_id))
     JOIN workout_template_exercise USING (workout_template_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))))
with check ((workout_template_exercise_id IN ( SELECT workout_template_exercise.workout_template_exercise_id
   FROM ((profile
     JOIN workout_template USING (profile_id))
     JOIN workout_template_exercise USING (workout_template_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))));



