import { Session } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import { FC, PropsWithChildren, createContext } from 'react'
import { supabase } from '@/supabase'
import { Tables } from '@/supabase/types'

export const ProfileContext = createContext<Tables<'profile'> | null>(null)

export const ProfileProvider: FC<PropsWithChildren<{ session: Session }>> = ({
  session,
  children,
}) => {
  const { data, isFetching } = useQuery({
    queryKey: [session, 'profile'],
    queryFn: async () => {
      const res = await supabase
        .from('profile')
        .select()
        .eq('profile_id', session.user.id)
        .single()
      return res
    },
    gcTime: 0,
    staleTime: 0,
  })

  if (data?.error) console.log({ error: data.error })

  if (!isFetching && !data)
    console.error('No profile found for user', session.user.id)

  return (
    <ProfileContext.Provider value={data?.data || null}>
      {children}
    </ProfileContext.Provider>
  )
}
