import { useSession } from '@supabase/auth-helpers-react'
import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'
import { theme } from '@/constants/theme'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

export default function RootLayout() {
  const session = useSession()

  if (!session) return <Redirect href="/" />

  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: theme.colours.light },
          headerStyle: { backgroundColor: theme.colours.dark },
          headerTitleStyle: { color: theme.colours.white },
          headerTintColor: theme.colours.grey300,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  )
}
