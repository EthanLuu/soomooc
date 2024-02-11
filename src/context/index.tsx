import { ReactNode } from 'react'
import { AuthProvider } from '@/context/auth-context'
import { CourseProvider } from './course-context'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <CourseProvider>{children}</CourseProvider>
    </AuthProvider>
  )
}
