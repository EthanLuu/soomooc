import { useAuth } from 'context/auth-context';
export const useMyCourses = () => {
  const {user} = useAuth()
  return user?.courses || []
}