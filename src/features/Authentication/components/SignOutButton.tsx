import { Button, ButtonProps } from '@/components/Button'
import { supabase } from '@/supabase'

type SignOutProps = Pick<ButtonProps, 'colour' | 'size'>

export const SignOutButton = ({ colour = 'danger', size }: SignOutProps) => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
  return (
    <Button onPress={signOut} colour={colour} size={size}>
      Sign out
    </Button>
  )
}
