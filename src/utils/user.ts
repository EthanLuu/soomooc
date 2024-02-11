import { useHttp } from './http'
import { useCourses } from './course'
import { useAuth } from '@/context/auth-context'
import { useRequest } from 'ahooks'
import { User } from '@/type/user'

export const userTypeMap: { [key: number]: string } = {
  0: '管理员',
  1: '教师',
  2: '学生',
}

export const useMyCourses = () => {
  const { user } = useAuth()
  const { data: courses } = useCourses()
  return courses?.filter(course => user?.courses.includes(course._id)) || []
}

export const useAllUsers = () => {
  const client = useHttp()
  return useRequest<User[], any>(() => client(`user/users`), {})
}
