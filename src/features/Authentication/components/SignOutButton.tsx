import { useQueryClient } from '@tanstack/react-query'
import { Button, ButtonProps } from '@/components/Button'
import { supabase } from '@/supabase/supabase'

type SignOutProps = Pick<ButtonProps, 'colour' | 'size'>

export const SignOutButton = ({ colour = 'danger', size }: SignOutProps) => {
  const queryClient = useQueryClient()
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    queryClient.invalidateQueries({ queryKey: ['profile'] })
    if (error) throw error
  }
  return (
    <Button onPress={signOut} colour={colour} size={size}>
      Sign out
    </Button>
  )
}
