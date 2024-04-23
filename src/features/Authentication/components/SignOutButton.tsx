import { Button, ButtonProps } from '@/components/Button'
import { supabase } from '@/utils/supabase'

type SignOutProps = Pick<ButtonProps, 'colour' | 'size'>

export const SignOutButton = (
  { colour, size }: SignOutProps = { colour: 'danger' },
) => {
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
