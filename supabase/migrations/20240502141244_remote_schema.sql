set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile_for_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profile (profile_id)
  values (new.id);

  return new;
end;$function$
;


