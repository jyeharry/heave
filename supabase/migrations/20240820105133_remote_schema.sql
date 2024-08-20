create extension if not exists "pg_trgm" with schema "extensions";


drop policy "Enable CRUD for users based on profile_id" on "public"."workout_log_exercise";

drop policy "Enable CRUD for users based on profile_id" on "public"."workout_template_exercise";

alter table "public"."workout_log" drop constraint "workout_log_workout_template_id_fkey";

alter table "public"."workout_log_exercise" drop constraint "workout_log_exercise_workout_log_id_fkey";

alter table "public"."workout_log_exercise_set" drop constraint "workout_log_exercise_set_workout_log_exercise_id_fkey";

drop function if exists "public"."create_profile_for_user"();

create table "public"."follower" (
    "profile_id" uuid not null,
    "follower_id" uuid not null,
    "followed_at" timestamp with time zone default now()
);


alter table "public"."follower" enable row level security;

alter table "public"."exercise" alter column "body_part" set not null;

alter table "public"."exercise" alter column "equipment" set not null;

alter table "public"."exercise" alter column "name" set not null;

alter table "public"."exercise" alter column "target" set not null;

alter table "public"."profile" add column "email" text not null;

alter table "public"."profile" add column "first_name" text;

alter table "public"."profile" add column "last_name" text;

alter table "public"."workout_entity" alter column "created_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."workout_entity" alter column "created_at" set not null;

alter table "public"."workout_entity" alter column "created_at" set data type timestamp with time zone using "created_at"::timestamp with time zone;

alter table "public"."workout_entity" alter column "title" drop not null;

alter table "public"."workout_entity" alter column "title" set data type text using "title"::text;

alter table "public"."workout_entity" alter column "updated_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."workout_entity" alter column "updated_at" set not null;

alter table "public"."workout_entity" alter column "updated_at" set data type timestamp with time zone using "updated_at"::timestamp with time zone;

alter table "public"."workout_exercise_set_entity" alter column "reps" set not null;

alter table "public"."workout_exercise_set_entity" alter column "type" set default 'Standard'::set_type;

alter table "public"."workout_exercise_set_entity" alter column "type" set not null;

alter table "public"."workout_exercise_set_entity" alter column "weight" set not null;

alter table "public"."workout_log" alter column "created_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."workout_log" alter column "created_at" set not null;

alter table "public"."workout_log" alter column "created_at" set data type timestamp with time zone using "created_at"::timestamp with time zone;

alter table "public"."workout_log" alter column "title" drop not null;

alter table "public"."workout_log" alter column "title" set data type text using "title"::text;

alter table "public"."workout_log" alter column "updated_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."workout_log" alter column "updated_at" set not null;

alter table "public"."workout_log" alter column "updated_at" set data type timestamp with time zone using "updated_at"::timestamp with time zone;

alter table "public"."workout_log_exercise" alter column "index" set not null;

alter table "public"."workout_log_exercise" alter column "workout_log_id" set not null;

alter table "public"."workout_log_exercise_set" alter column "reps" set not null;

alter table "public"."workout_log_exercise_set" alter column "type" set default 'Standard'::set_type;

alter table "public"."workout_log_exercise_set" alter column "type" set not null;

alter table "public"."workout_log_exercise_set" alter column "weight" set not null;

alter table "public"."workout_template" add column "last_performed" timestamp with time zone;

alter table "public"."workout_template" alter column "created_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."workout_template" alter column "created_at" set not null;

alter table "public"."workout_template" alter column "created_at" set data type timestamp with time zone using "created_at"::timestamp with time zone;

alter table "public"."workout_template" alter column "title" drop not null;

alter table "public"."workout_template" alter column "title" set data type text using "title"::text;

alter table "public"."workout_template" alter column "updated_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."workout_template" alter column "updated_at" set not null;

alter table "public"."workout_template" alter column "updated_at" set data type timestamp with time zone using "updated_at"::timestamp with time zone;

alter table "public"."workout_template_exercise" alter column "index" set not null;

alter table "public"."workout_template_exercise" alter column "workout_template_id" set not null;

alter table "public"."workout_template_exercise_set" alter column "reps" set not null;

alter table "public"."workout_template_exercise_set" alter column "type" set default 'Standard'::set_type;

alter table "public"."workout_template_exercise_set" alter column "type" set not null;

alter table "public"."workout_template_exercise_set" alter column "weight" set not null;

CREATE UNIQUE INDEX followers_pkey ON public.follower USING btree (profile_id, follower_id);

alter table "public"."follower" add constraint "followers_pkey" PRIMARY KEY using index "followers_pkey";

alter table "public"."follower" add constraint "followers_check" CHECK ((follower_id <> profile_id)) not valid;

alter table "public"."follower" validate constraint "followers_check";

alter table "public"."follower" add constraint "followers_follower_id_fkey" FOREIGN KEY (follower_id) REFERENCES profile(profile_id) ON DELETE CASCADE not valid;

alter table "public"."follower" validate constraint "followers_follower_id_fkey";

alter table "public"."follower" add constraint "followers_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(profile_id) ON DELETE CASCADE not valid;

alter table "public"."follower" validate constraint "followers_profile_id_fkey";

alter table "public"."workout_log" add constraint "workout_log_workout_template_id_fkey" FOREIGN KEY (workout_template_id) REFERENCES workout_template(workout_template_id) ON DELETE SET NULL not valid;

alter table "public"."workout_log" validate constraint "workout_log_workout_template_id_fkey";

alter table "public"."workout_log_exercise" add constraint "workout_log_exercise_workout_log_id_fkey" FOREIGN KEY (workout_log_id) REFERENCES workout_log(workout_log_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workout_log_exercise" validate constraint "workout_log_exercise_workout_log_id_fkey";

alter table "public"."workout_log_exercise_set" add constraint "workout_log_exercise_set_workout_log_exercise_id_fkey" FOREIGN KEY (workout_log_exercise_id) REFERENCES workout_log_exercise(workout_log_exercise_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workout_log_exercise_set" validate constraint "workout_log_exercise_set_workout_log_exercise_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profile (profile_id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.search_profiles(name text)
 RETURNS SETOF profile
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT *
    FROM profile p
    WHERE word_similarity(name, p.first_name || ' ' || p.last_name) >= 0.6
    ORDER BY word_similarity(name, p.first_name || ' ' || p.last_name) + 
        CASE 
            WHEN auth.uid() IN (SELECT f.follower_id FROM follower f WHERE f.profile_id = p.profile_id) THEN 0.2
            WHEN p.profile_id IN (SELECT f.profile_id FROM follower f WHERE f.follower_id IN (SELECT f2.profile_id FROM follower f2 WHERE f2.follower_id = auth.uid())) THEN 0.1
            ELSE 0.0
        END DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.upsert_workout(payload jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  current_workout_template_id UUID;
  current_workout_template_exercise_id UUID;
  current_workout_log_id UUID;
  current_workout_log_exercise_id UUID;
  exercise record;
  set record;
  is_new_exercise bool;
  workout_template_exercise_ids uuid[];
  mode text;
BEGIN
  mode := payload ->> 'mode';
  workout_template_exercise_ids := ARRAY[]::uuid[];

  IF mode = 'create' THEN
    INSERT INTO workout_template (profile_id, author_profile_id, title, notes)
    VALUES (auth.uid(), auth.uid(), payload ->> 'title', payload ->> 'notes')
    RETURNING workout_template_id INTO current_workout_template_id;
  ELSE
    UPDATE workout_template
    SET
      title = payload ->> 'title',
      notes = payload ->> 'notes'
    WHERE workout_template_id = (payload ->> 'workoutTemplateID')::uuid
    RETURNING workout_template_id INTO current_workout_template_id;
  END IF;

  IF mode = 'perform' THEN
    UPDATE workout_template
    SET
      last_performed = (payload ->> 'lastPerformed')::timestamptz
    WHERE workout_template_id = current_workout_template_id;

    INSERT INTO workout_log (profile_id, author_profile_id, title, notes, workout_template_id)
    VALUES (auth.uid(), auth.uid(), payload ->> 'title', payload ->> 'notes', current_workout_template_id)
    RETURNING workout_log_id INTO current_workout_log_id;
  END IF;

  FOR exercise IN SELECT * FROM jsonb_to_recordset(payload -> 'exercises') as ex(
    "workoutTemplateExerciseID" uuid,
    exercise jsonb,
    index int2,
    sets jsonb
  ) LOOP
    IF mode = 'create' OR exercise."workoutTemplateExerciseID" is null THEN
      INSERT INTO workout_template_exercise (workout_template_id, exercise_id, index)
      VALUES (current_workout_template_id, (exercise.exercise ->> 'exerciseID')::uuid, exercise.index)
      RETURNING workout_template_exercise_id INTO current_workout_template_exercise_id;
    ELSE
      UPDATE workout_template_exercise
      SET index = exercise.index
      WHERE workout_template_exercise_id = exercise."workoutTemplateExerciseID"
      RETURNING workout_template_exercise_id INTO current_workout_template_exercise_id;
    END IF;

    workout_template_exercise_ids := array_append(workout_template_exercise_ids, current_workout_template_exercise_id);

    IF mode = 'perform' THEN
      INSERT INTO workout_log_exercise (workout_log_id, exercise_id, index)
      VALUES (current_workout_log_id, (exercise.exercise ->> 'exerciseID')::uuid, exercise.index)
      RETURNING workout_log_exercise_id INTO current_workout_log_exercise_id;
    END IF;

    -- Delete all sets to reinitialise them
    IF not mode = 'create' THEN
      DELETE FROM workout_template_exercise_set
      WHERE workout_template_exercise_id = current_workout_template_exercise_id;
    END IF;

    FOR set IN SELECT * FROM jsonb_to_recordset(exercise.sets) as s(
      "setType" set_type,
      weight numeric,
      reps int2,
      index int2
    ) LOOP
      INSERT INTO workout_template_exercise_set (workout_template_exercise_id, type, weight, reps, index)
      VALUES (current_workout_template_exercise_id, set."setType", set.weight, set.reps, set.index);

      IF mode = 'perform' THEN
        INSERT INTO workout_log_exercise_set (workout_log_exercise_id, type, weight, reps, index)
        VALUES (current_workout_log_exercise_id, set."setType", set.weight, set.reps, set.index);
      END IF;
    END LOOP;
  END LOOP;

  IF NOT mode = 'create' THEN
    DELETE FROM workout_template_exercise
    WHERE NOT workout_template_exercise_id = ANY (workout_template_exercise_ids)
    AND workout_template_id = current_workout_template_id;
  END IF;
END;
$function$
;

grant delete on table "public"."follower" to "anon";

grant insert on table "public"."follower" to "anon";

grant references on table "public"."follower" to "anon";

grant select on table "public"."follower" to "anon";

grant trigger on table "public"."follower" to "anon";

grant truncate on table "public"."follower" to "anon";

grant update on table "public"."follower" to "anon";

grant delete on table "public"."follower" to "authenticated";

grant insert on table "public"."follower" to "authenticated";

grant references on table "public"."follower" to "authenticated";

grant select on table "public"."follower" to "authenticated";

grant trigger on table "public"."follower" to "authenticated";

grant truncate on table "public"."follower" to "authenticated";

grant update on table "public"."follower" to "authenticated";

grant delete on table "public"."follower" to "service_role";

grant insert on table "public"."follower" to "service_role";

grant references on table "public"."follower" to "service_role";

grant select on table "public"."follower" to "service_role";

grant trigger on table "public"."follower" to "service_role";

grant truncate on table "public"."follower" to "service_role";

grant update on table "public"."follower" to "service_role";

create policy "Enable CRUD for followers based on follower_id"
on "public"."follower"
as permissive
for all
to public
using ((( SELECT auth.uid() AS uid) = follower_id))
with check ((( SELECT auth.uid() AS uid) = follower_id));


create policy "Enable read access for all users"
on "public"."follower"
as permissive
for select
to public
using (true);


create policy "Enable CRUD for users based on profile_id"
on "public"."workout_log_exercise"
as permissive
for all
to public
using ((workout_log_id IN ( SELECT workout_log.workout_log_id
   FROM (profile
     JOIN workout_log USING (profile_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))))
with check ((workout_log_id IN ( SELECT workout_log.workout_log_id
   FROM (profile
     JOIN workout_log USING (profile_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))));


create policy "Enable CRUD for users based on profile_id"
on "public"."workout_template_exercise"
as permissive
for all
to public
using ((workout_template_id IN ( SELECT workout_template.workout_template_id
   FROM (profile
     JOIN workout_template USING (profile_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))))
with check ((workout_template_id IN ( SELECT workout_template.workout_template_id
   FROM (profile
     JOIN workout_template USING (profile_id))
  WHERE (profile.profile_id = ( SELECT auth.uid() AS uid)))));


CREATE TRIGGER update_exercise_updated_at_time BEFORE UPDATE ON public.exercise FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();

CREATE TRIGGER update_profile_updated_at_time BEFORE UPDATE ON public.profile FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();

CREATE TRIGGER update_updated_at_time BEFORE UPDATE ON public.workout_log FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();

CREATE TRIGGER update_updated_at_time BEFORE UPDATE ON public.workout_template FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


