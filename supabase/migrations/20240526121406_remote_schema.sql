create type "public"."set_type" as enum ('Standard', 'Warmup', 'Drop set');

create table "public"."exercise" (
    "exercise_id" uuid not null,
    "name" character varying(100),
    "body_part" character varying(50),
    "equipment" character varying(50),
    "target" character varying(50),
    "secondary_muscles" character varying(50)[],
    "instructions" text[],
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone default CURRENT_TIMESTAMP
);


create table "public"."workout_entity" (
    "profile_id" uuid,
    "author_profile_id" uuid,
    "title" character varying(50) not null,
    "notes" text,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone default CURRENT_TIMESTAMP
);


create table "public"."workout_exercise_entity" (
    "exercise_id" uuid,
    "index" smallint
);


create table "public"."workout_exercise_set_entity" (
    "index" smallint,
    "type" set_type,
    "weight" numeric(7,3),
    "reps" smallint
);


create table "public"."workout_log" (
    "profile_id" uuid not null,
    "author_profile_id" uuid,
    "title" character varying(50) not null,
    "notes" text,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "workout_log_id" uuid not null,
    "workout_template_id" uuid
) inherits ("public"."workout_entity");


create table "public"."workout_log_exercise" (
    "exercise_id" uuid not null,
    "index" smallint,
    "workout_log_exercise_id" uuid not null,
    "workout_log_id" uuid
) inherits ("public"."workout_exercise_entity");


create table "public"."workout_log_exercise_set" (
    "index" smallint not null,
    "type" set_type,
    "weight" numeric(7,3),
    "reps" smallint,
    "workout_log_exercise_id" uuid not null
) inherits ("public"."workout_exercise_set_entity");


create table "public"."workout_template" (
    "profile_id" uuid not null,
    "author_profile_id" uuid,
    "title" character varying(50) not null,
    "notes" text,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "workout_template_id" uuid not null
) inherits ("public"."workout_entity");


create table "public"."workout_template_exercise" (
    "exercise_id" uuid not null,
    "index" smallint,
    "workout_template_exercise_id" uuid not null,
    "workout_template_id" uuid
) inherits ("public"."workout_exercise_entity");


create table "public"."workout_template_exercise_set" (
    "index" smallint not null,
    "type" set_type,
    "weight" numeric(7,3),
    "reps" smallint,
    "workout_template_exercise_id" uuid not null
) inherits ("public"."workout_exercise_set_entity");


alter table "public"."profile" add column "updated_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text);

CREATE UNIQUE INDEX exercise_pkey ON public.exercise USING btree (exercise_id);

CREATE UNIQUE INDEX workout_log_exercise_pkey ON public.workout_log_exercise USING btree (workout_log_exercise_id);

CREATE UNIQUE INDEX workout_log_exercise_set_pkey ON public.workout_log_exercise_set USING btree (workout_log_exercise_id, index);

CREATE UNIQUE INDEX workout_log_pkey ON public.workout_log USING btree (workout_log_id);

CREATE UNIQUE INDEX workout_template_exercise_pkey ON public.workout_template_exercise USING btree (workout_template_exercise_id);

CREATE UNIQUE INDEX workout_template_exercise_set_pkey ON public.workout_template_exercise_set USING btree (workout_template_exercise_id, index);

CREATE UNIQUE INDEX workout_template_pkey ON public.workout_template USING btree (workout_template_id);

alter table "public"."exercise" add constraint "exercise_pkey" PRIMARY KEY using index "exercise_pkey";

alter table "public"."workout_log" add constraint "workout_log_pkey" PRIMARY KEY using index "workout_log_pkey";

alter table "public"."workout_log_exercise" add constraint "workout_log_exercise_pkey" PRIMARY KEY using index "workout_log_exercise_pkey";

alter table "public"."workout_log_exercise_set" add constraint "workout_log_exercise_set_pkey" PRIMARY KEY using index "workout_log_exercise_set_pkey";

alter table "public"."workout_template" add constraint "workout_template_pkey" PRIMARY KEY using index "workout_template_pkey";

alter table "public"."workout_template_exercise" add constraint "workout_template_exercise_pkey" PRIMARY KEY using index "workout_template_exercise_pkey";

alter table "public"."workout_template_exercise_set" add constraint "workout_template_exercise_set_pkey" PRIMARY KEY using index "workout_template_exercise_set_pkey";

alter table "public"."workout_entity" add constraint "workout_entity_author_profile_id_fkey" FOREIGN KEY (author_profile_id) REFERENCES profile(profile_id) not valid;

alter table "public"."workout_entity" validate constraint "workout_entity_author_profile_id_fkey";

alter table "public"."workout_entity" add constraint "workout_entity_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(profile_id) ON DELETE CASCADE not valid;

alter table "public"."workout_entity" validate constraint "workout_entity_profile_id_fkey";

alter table "public"."workout_exercise_entity" add constraint "workout_exercise_entity_exercise_id_fkey" FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id) not valid;

alter table "public"."workout_exercise_entity" validate constraint "workout_exercise_entity_exercise_id_fkey";

alter table "public"."workout_log" add constraint "workout_log_author_profile_id_fkey" FOREIGN KEY (author_profile_id) REFERENCES profile(profile_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."workout_log" validate constraint "workout_log_author_profile_id_fkey";

alter table "public"."workout_log" add constraint "workout_log_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(profile_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workout_log" validate constraint "workout_log_profile_id_fkey";

alter table "public"."workout_log" add constraint "workout_log_workout_template_id_fkey" FOREIGN KEY (workout_template_id) REFERENCES workout_template(workout_template_id) not valid;

alter table "public"."workout_log" validate constraint "workout_log_workout_template_id_fkey";

alter table "public"."workout_log_exercise" add constraint "workout_log_exercise_exercise_id_fkey" FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workout_log_exercise" validate constraint "workout_log_exercise_exercise_id_fkey";

alter table "public"."workout_log_exercise" add constraint "workout_log_exercise_workout_log_id_fkey" FOREIGN KEY (workout_log_id) REFERENCES workout_log(workout_log_id) ON DELETE CASCADE not valid;

alter table "public"."workout_log_exercise" validate constraint "workout_log_exercise_workout_log_id_fkey";

alter table "public"."workout_log_exercise_set" add constraint "workout_log_exercise_set_workout_log_exercise_id_fkey" FOREIGN KEY (workout_log_exercise_id) REFERENCES workout_log_exercise(workout_log_exercise_id) not valid;

alter table "public"."workout_log_exercise_set" validate constraint "workout_log_exercise_set_workout_log_exercise_id_fkey";

alter table "public"."workout_template" add constraint "workout_template_author_profile_id_fkey" FOREIGN KEY (author_profile_id) REFERENCES profile(profile_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."workout_template" validate constraint "workout_template_author_profile_id_fkey";

alter table "public"."workout_template" add constraint "workout_template_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(profile_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workout_template" validate constraint "workout_template_profile_id_fkey";

alter table "public"."workout_template_exercise" add constraint "workout_template_exercise_exercise_id_fkey" FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."workout_template_exercise" validate constraint "workout_template_exercise_exercise_id_fkey";

alter table "public"."workout_template_exercise" add constraint "workout_template_exercise_workout_template_id_fkey" FOREIGN KEY (workout_template_id) REFERENCES workout_template(workout_template_id) ON DELETE CASCADE not valid;

alter table "public"."workout_template_exercise" validate constraint "workout_template_exercise_workout_template_id_fkey";

alter table "public"."workout_template_exercise_set" add constraint "workout_template_exercise_set_workout_template_exercise_id_fkey" FOREIGN KEY (workout_template_exercise_id) REFERENCES workout_template_exercise(workout_template_exercise_id) not valid;

alter table "public"."workout_template_exercise_set" validate constraint "workout_template_exercise_set_workout_template_exercise_id_fkey";

grant delete on table "public"."exercise" to "anon";

grant insert on table "public"."exercise" to "anon";

grant references on table "public"."exercise" to "anon";

grant select on table "public"."exercise" to "anon";

grant trigger on table "public"."exercise" to "anon";

grant truncate on table "public"."exercise" to "anon";

grant update on table "public"."exercise" to "anon";

grant delete on table "public"."exercise" to "authenticated";

grant insert on table "public"."exercise" to "authenticated";

grant references on table "public"."exercise" to "authenticated";

grant select on table "public"."exercise" to "authenticated";

grant trigger on table "public"."exercise" to "authenticated";

grant truncate on table "public"."exercise" to "authenticated";

grant update on table "public"."exercise" to "authenticated";

grant delete on table "public"."exercise" to "service_role";

grant insert on table "public"."exercise" to "service_role";

grant references on table "public"."exercise" to "service_role";

grant select on table "public"."exercise" to "service_role";

grant trigger on table "public"."exercise" to "service_role";

grant truncate on table "public"."exercise" to "service_role";

grant update on table "public"."exercise" to "service_role";

grant delete on table "public"."workout_entity" to "anon";

grant insert on table "public"."workout_entity" to "anon";

grant references on table "public"."workout_entity" to "anon";

grant select on table "public"."workout_entity" to "anon";

grant trigger on table "public"."workout_entity" to "anon";

grant truncate on table "public"."workout_entity" to "anon";

grant update on table "public"."workout_entity" to "anon";

grant delete on table "public"."workout_entity" to "authenticated";

grant insert on table "public"."workout_entity" to "authenticated";

grant references on table "public"."workout_entity" to "authenticated";

grant select on table "public"."workout_entity" to "authenticated";

grant trigger on table "public"."workout_entity" to "authenticated";

grant truncate on table "public"."workout_entity" to "authenticated";

grant update on table "public"."workout_entity" to "authenticated";

grant delete on table "public"."workout_entity" to "service_role";

grant insert on table "public"."workout_entity" to "service_role";

grant references on table "public"."workout_entity" to "service_role";

grant select on table "public"."workout_entity" to "service_role";

grant trigger on table "public"."workout_entity" to "service_role";

grant truncate on table "public"."workout_entity" to "service_role";

grant update on table "public"."workout_entity" to "service_role";

grant delete on table "public"."workout_exercise_entity" to "anon";

grant insert on table "public"."workout_exercise_entity" to "anon";

grant references on table "public"."workout_exercise_entity" to "anon";

grant select on table "public"."workout_exercise_entity" to "anon";

grant trigger on table "public"."workout_exercise_entity" to "anon";

grant truncate on table "public"."workout_exercise_entity" to "anon";

grant update on table "public"."workout_exercise_entity" to "anon";

grant delete on table "public"."workout_exercise_entity" to "authenticated";

grant insert on table "public"."workout_exercise_entity" to "authenticated";

grant references on table "public"."workout_exercise_entity" to "authenticated";

grant select on table "public"."workout_exercise_entity" to "authenticated";

grant trigger on table "public"."workout_exercise_entity" to "authenticated";

grant truncate on table "public"."workout_exercise_entity" to "authenticated";

grant update on table "public"."workout_exercise_entity" to "authenticated";

grant delete on table "public"."workout_exercise_entity" to "service_role";

grant insert on table "public"."workout_exercise_entity" to "service_role";

grant references on table "public"."workout_exercise_entity" to "service_role";

grant select on table "public"."workout_exercise_entity" to "service_role";

grant trigger on table "public"."workout_exercise_entity" to "service_role";

grant truncate on table "public"."workout_exercise_entity" to "service_role";

grant update on table "public"."workout_exercise_entity" to "service_role";

grant delete on table "public"."workout_exercise_set_entity" to "anon";

grant insert on table "public"."workout_exercise_set_entity" to "anon";

grant references on table "public"."workout_exercise_set_entity" to "anon";

grant select on table "public"."workout_exercise_set_entity" to "anon";

grant trigger on table "public"."workout_exercise_set_entity" to "anon";

grant truncate on table "public"."workout_exercise_set_entity" to "anon";

grant update on table "public"."workout_exercise_set_entity" to "anon";

grant delete on table "public"."workout_exercise_set_entity" to "authenticated";

grant insert on table "public"."workout_exercise_set_entity" to "authenticated";

grant references on table "public"."workout_exercise_set_entity" to "authenticated";

grant select on table "public"."workout_exercise_set_entity" to "authenticated";

grant trigger on table "public"."workout_exercise_set_entity" to "authenticated";

grant truncate on table "public"."workout_exercise_set_entity" to "authenticated";

grant update on table "public"."workout_exercise_set_entity" to "authenticated";

grant delete on table "public"."workout_exercise_set_entity" to "service_role";

grant insert on table "public"."workout_exercise_set_entity" to "service_role";

grant references on table "public"."workout_exercise_set_entity" to "service_role";

grant select on table "public"."workout_exercise_set_entity" to "service_role";

grant trigger on table "public"."workout_exercise_set_entity" to "service_role";

grant truncate on table "public"."workout_exercise_set_entity" to "service_role";

grant update on table "public"."workout_exercise_set_entity" to "service_role";

grant delete on table "public"."workout_log" to "anon";

grant insert on table "public"."workout_log" to "anon";

grant references on table "public"."workout_log" to "anon";

grant select on table "public"."workout_log" to "anon";

grant trigger on table "public"."workout_log" to "anon";

grant truncate on table "public"."workout_log" to "anon";

grant update on table "public"."workout_log" to "anon";

grant delete on table "public"."workout_log" to "authenticated";

grant insert on table "public"."workout_log" to "authenticated";

grant references on table "public"."workout_log" to "authenticated";

grant select on table "public"."workout_log" to "authenticated";

grant trigger on table "public"."workout_log" to "authenticated";

grant truncate on table "public"."workout_log" to "authenticated";

grant update on table "public"."workout_log" to "authenticated";

grant delete on table "public"."workout_log" to "service_role";

grant insert on table "public"."workout_log" to "service_role";

grant references on table "public"."workout_log" to "service_role";

grant select on table "public"."workout_log" to "service_role";

grant trigger on table "public"."workout_log" to "service_role";

grant truncate on table "public"."workout_log" to "service_role";

grant update on table "public"."workout_log" to "service_role";

grant delete on table "public"."workout_log_exercise" to "anon";

grant insert on table "public"."workout_log_exercise" to "anon";

grant references on table "public"."workout_log_exercise" to "anon";

grant select on table "public"."workout_log_exercise" to "anon";

grant trigger on table "public"."workout_log_exercise" to "anon";

grant truncate on table "public"."workout_log_exercise" to "anon";

grant update on table "public"."workout_log_exercise" to "anon";

grant delete on table "public"."workout_log_exercise" to "authenticated";

grant insert on table "public"."workout_log_exercise" to "authenticated";

grant references on table "public"."workout_log_exercise" to "authenticated";

grant select on table "public"."workout_log_exercise" to "authenticated";

grant trigger on table "public"."workout_log_exercise" to "authenticated";

grant truncate on table "public"."workout_log_exercise" to "authenticated";

grant update on table "public"."workout_log_exercise" to "authenticated";

grant delete on table "public"."workout_log_exercise" to "service_role";

grant insert on table "public"."workout_log_exercise" to "service_role";

grant references on table "public"."workout_log_exercise" to "service_role";

grant select on table "public"."workout_log_exercise" to "service_role";

grant trigger on table "public"."workout_log_exercise" to "service_role";

grant truncate on table "public"."workout_log_exercise" to "service_role";

grant update on table "public"."workout_log_exercise" to "service_role";

grant delete on table "public"."workout_log_exercise_set" to "anon";

grant insert on table "public"."workout_log_exercise_set" to "anon";

grant references on table "public"."workout_log_exercise_set" to "anon";

grant select on table "public"."workout_log_exercise_set" to "anon";

grant trigger on table "public"."workout_log_exercise_set" to "anon";

grant truncate on table "public"."workout_log_exercise_set" to "anon";

grant update on table "public"."workout_log_exercise_set" to "anon";

grant delete on table "public"."workout_log_exercise_set" to "authenticated";

grant insert on table "public"."workout_log_exercise_set" to "authenticated";

grant references on table "public"."workout_log_exercise_set" to "authenticated";

grant select on table "public"."workout_log_exercise_set" to "authenticated";

grant trigger on table "public"."workout_log_exercise_set" to "authenticated";

grant truncate on table "public"."workout_log_exercise_set" to "authenticated";

grant update on table "public"."workout_log_exercise_set" to "authenticated";

grant delete on table "public"."workout_log_exercise_set" to "service_role";

grant insert on table "public"."workout_log_exercise_set" to "service_role";

grant references on table "public"."workout_log_exercise_set" to "service_role";

grant select on table "public"."workout_log_exercise_set" to "service_role";

grant trigger on table "public"."workout_log_exercise_set" to "service_role";

grant truncate on table "public"."workout_log_exercise_set" to "service_role";

grant update on table "public"."workout_log_exercise_set" to "service_role";

grant delete on table "public"."workout_template" to "anon";

grant insert on table "public"."workout_template" to "anon";

grant references on table "public"."workout_template" to "anon";

grant select on table "public"."workout_template" to "anon";

grant trigger on table "public"."workout_template" to "anon";

grant truncate on table "public"."workout_template" to "anon";

grant update on table "public"."workout_template" to "anon";

grant delete on table "public"."workout_template" to "authenticated";

grant insert on table "public"."workout_template" to "authenticated";

grant references on table "public"."workout_template" to "authenticated";

grant select on table "public"."workout_template" to "authenticated";

grant trigger on table "public"."workout_template" to "authenticated";

grant truncate on table "public"."workout_template" to "authenticated";

grant update on table "public"."workout_template" to "authenticated";

grant delete on table "public"."workout_template" to "service_role";

grant insert on table "public"."workout_template" to "service_role";

grant references on table "public"."workout_template" to "service_role";

grant select on table "public"."workout_template" to "service_role";

grant trigger on table "public"."workout_template" to "service_role";

grant truncate on table "public"."workout_template" to "service_role";

grant update on table "public"."workout_template" to "service_role";

grant delete on table "public"."workout_template_exercise" to "anon";

grant insert on table "public"."workout_template_exercise" to "anon";

grant references on table "public"."workout_template_exercise" to "anon";

grant select on table "public"."workout_template_exercise" to "anon";

grant trigger on table "public"."workout_template_exercise" to "anon";

grant truncate on table "public"."workout_template_exercise" to "anon";

grant update on table "public"."workout_template_exercise" to "anon";

grant delete on table "public"."workout_template_exercise" to "authenticated";

grant insert on table "public"."workout_template_exercise" to "authenticated";

grant references on table "public"."workout_template_exercise" to "authenticated";

grant select on table "public"."workout_template_exercise" to "authenticated";

grant trigger on table "public"."workout_template_exercise" to "authenticated";

grant truncate on table "public"."workout_template_exercise" to "authenticated";

grant update on table "public"."workout_template_exercise" to "authenticated";

grant delete on table "public"."workout_template_exercise" to "service_role";

grant insert on table "public"."workout_template_exercise" to "service_role";

grant references on table "public"."workout_template_exercise" to "service_role";

grant select on table "public"."workout_template_exercise" to "service_role";

grant trigger on table "public"."workout_template_exercise" to "service_role";

grant truncate on table "public"."workout_template_exercise" to "service_role";

grant update on table "public"."workout_template_exercise" to "service_role";

grant delete on table "public"."workout_template_exercise_set" to "anon";

grant insert on table "public"."workout_template_exercise_set" to "anon";

grant references on table "public"."workout_template_exercise_set" to "anon";

grant select on table "public"."workout_template_exercise_set" to "anon";

grant trigger on table "public"."workout_template_exercise_set" to "anon";

grant truncate on table "public"."workout_template_exercise_set" to "anon";

grant update on table "public"."workout_template_exercise_set" to "anon";

grant delete on table "public"."workout_template_exercise_set" to "authenticated";

grant insert on table "public"."workout_template_exercise_set" to "authenticated";

grant references on table "public"."workout_template_exercise_set" to "authenticated";

grant select on table "public"."workout_template_exercise_set" to "authenticated";

grant trigger on table "public"."workout_template_exercise_set" to "authenticated";

grant truncate on table "public"."workout_template_exercise_set" to "authenticated";

grant update on table "public"."workout_template_exercise_set" to "authenticated";

grant delete on table "public"."workout_template_exercise_set" to "service_role";

grant insert on table "public"."workout_template_exercise_set" to "service_role";

grant references on table "public"."workout_template_exercise_set" to "service_role";

grant select on table "public"."workout_template_exercise_set" to "service_role";

grant trigger on table "public"."workout_template_exercise_set" to "service_role";

grant truncate on table "public"."workout_template_exercise_set" to "service_role";

grant update on table "public"."workout_template_exercise_set" to "service_role";


