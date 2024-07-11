create policy "Enable insert for users based on profile_id"
on "public"."workout_template"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = profile_id));



