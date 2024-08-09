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
  const { data } = useQuery({
    queryKey: [session, 'profile'],
    queryFn: async () => {
      const res = await supabase
        .from('profile')
        .select()
        .eq('profile_id', session.user.id)
        .single()
      if (res.error) throw new Error(res.error.message)
      return res.data
    },
    staleTime: 1000 * 60 * 60 * 24,
  })

  console.error('Profile time', new Date().toISOString())
  console.error({ profile: data })

  return (
    <ProfileContext.Provider value={data || null}>
      {children}
    </ProfileContext.Provider>
  )
}
