import { useSessionContext } from '@supabase/auth-helpers-react'
import {
  AppleAuthenticationScope,
  signInAsync,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  AppleAuthenticationButton,
} from 'expo-apple-authentication'
import { router, Redirect } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'
import { Text } from '@/components/Text'
import { supabase } from '@/supabase'

export const Authentication = () => {
  const sessionCtx = useSessionContext()
  if (sessionCtx.isLoading) return <Text>Loading...</Text>
  if (sessionCtx.session) return <Redirect href="/(app)/(tabs)" />
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={8}
          style={{ width: '100%', height: 48 }}
          onPress={async () => {
            try {
              const credential = await signInAsync({
                requestedScopes: [
                  AppleAuthenticationScope.FULL_NAME,
                  AppleAuthenticationScope.EMAIL,
                ],
              })
              // Sign in via Supabase Auth.
              if (credential.identityToken) {
                const { error } = await supabase.auth.signInWithIdToken({
                  provider: 'apple',
                  token: credential.identityToken,
                })
                if (!error) {
                  router.replace('/(app)/(tabs)')
                }
              } else {
                throw new Error('No identityToken.')
              }
            } catch (e: any) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user cancelled the sign-in flow
              } else {
                console.error(e)
              }
            }
          }}
        />
      )}
      {Platform.OS === 'android' && <Text>TODO: Android auth</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
