import { useCourses } from './course'
import { useAuth } from 'context/auth-context'
export const useMyCourses = () => {
  const { user } = useAuth()
  const { data: courses } = useCourses()
  return courses?.filter((course) => user?.courses.includes(course._id)) || []
}
