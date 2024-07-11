drop policy "Enable users to read their own profile" on "public"."profile";

alter table "public"."workout_template_exercise" drop constraint "workout_template_exercise_workout_template_id_fkey";

alter table "public"."workout_template_exercise_set" drop constraint "workout_template_exercise_set_workout_template_exercise_id_fkey";

alter table "public"."exercise" alter column "body_part" set data type text using "body_part"::text;

alter table "public"."exercise" alter column "equipment" set data type text using "equipment"::text;

alter table "public"."exercise" alter column "exercise_id" set default gen_random_uuid();

alter table "public"."exercise" alter column "name" set data type text using "name"::text;

alter table "public"."exercise" alter column "secondary_muscles" set data type text[] using "secondary_muscles"::text[];

alter table "public"."exercise" alter column "target" set data type text using "target"::text;

alter table "public"."exercise" enable row level security;

alter table "public"."workout_entity" enable row level security;

alter table "public"."workout_exercise_entity" enable row level security;

alter table "public"."workout_exercise_set_entity" enable row level security;

alter table "public"."workout_log" alter column "workout_log_id" set default gen_random_uuid();

alter table "public"."workout_log" enable row level security;

alter table "public"."workout_log_exercise" alter column "workout_log_exercise_id" set default gen_random_uuid();

alter table "public"."workout_log_exercise" enable row level security;

alter table "public"."workout_log_exercise_set" enable row level security;

alter table "public"."workout_template" alter column "workout_template_id" set default gen_random_uuid();

alter table "public"."workout_template" enable row level security;

alter table "public"."workout_template_exercise" alter column "workout_template_exercise_id" set default gen_random_uuid();

alter table "public"."workout_template_exercise" enable row level security;

alter table "public"."workout_template_exercise_set" enable row level security;

alter table "public"."workout_template_exercise" add constraint "workout_template_exercise_workout_template_id_fkey" FOREIGN KEY (workout_template_id) REFERENCES workout_template(workout_template_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workout_template_exercise" validate constraint "workout_template_exercise_workout_template_id_fkey";

alter table "public"."workout_template_exercise_set" add constraint "workout_template_exercise_set_workout_template_exercise_id_fkey" FOREIGN KEY (workout_template_exercise_id) REFERENCES workout_template_exercise(workout_template_exercise_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workout_template_exercise_set" validate constraint "workout_template_exercise_set_workout_template_exercise_id_fkey";

create policy "Enable read access for all users"
on "public"."exercise"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."profile"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."workout_entity"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."workout_exercise_entity"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."workout_exercise_set_entity"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."workout_log"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."workout_log_exercise"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."workout_log_exercise_set"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."workout_template"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."workout_template_exercise"
as permissive
for select
to public
using (true);


create policy "Enable insert for users based on user_id"
on "public"."workout_template_exercise_set"
as permissive
for insert
to authenticated
with check ((workout_template_exercise_id IN ( SELECT workout_template_exercise.workout_template_exercise_id
   FROM ((profile
     JOIN workout_template USING (profile_id))
     JOIN workout_template_exercise USING (workout_template_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))));


create policy "Enable read access for all users"
on "public"."workout_template_exercise_set"
as permissive
for select
to public
using (true);



