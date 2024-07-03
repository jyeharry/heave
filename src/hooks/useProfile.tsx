import { useContext } from 'react'
import { ProfileContext } from '@/context/ProfileProvider'

export const useProfile = () => {
  const profile = useContext(ProfileContext)
  if (!profile) {
    throw new Error('No profile found')
  }
  return profile
}
