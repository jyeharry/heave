import { useSession } from '@supabase/auth-helpers-react'
import { useQueryClient } from '@tanstack/react-query'
import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'
import { theme } from '@/constants/theme'
import { ProfileProvider } from '@/context/ProfileProvider'
import { exerciseQueries } from '@/features/Exercise/queries'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

export default function RootLayout() {
  const session = useSession()
  const queryClient = useQueryClient()

  if (!session) return <Redirect href="/" />

  queryClient.prefetchQuery({
    ...exerciseQueries.list,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 6,
  })

  return (
    <ProfileProvider session={session}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: theme.colours.grey100 },
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
    </ProfileProvider>
  )
}
