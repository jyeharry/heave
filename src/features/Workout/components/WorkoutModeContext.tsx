import { createContext, ProviderProps, FC } from 'react'
import { WorkoutMode } from '../types'

export const WorkoutModeContext = createContext<WorkoutMode>('create')

export const WorkoutModeProvider: FC<ProviderProps<WorkoutMode>> = ({
  value,
  children,
}) => {
  return (
    <WorkoutModeContext.Provider value={value}>
      {children}
    </WorkoutModeContext.Provider>
  )
}
