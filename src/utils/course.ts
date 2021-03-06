import { useLocation } from 'react-router'
import { useRequest } from 'ahooks'
import { CourseProps } from 'type/course'
import { useHttp } from './http'

export const useCourses = () => {
  const client = useHttp()
  return useRequest<CourseProps[]>(() => client(`course/courses`), {
    throwOnError: true,
  })
}

export const useCourseById = (courseId: string) => {
  const client = useHttp()
  return useRequest<CourseProps>(() => client(`course/${courseId}`), {
    throwOnError: true,
  })
}

export const useCourseIdInUrl = () => {
  const location = useLocation()
  return location.pathname.split('/').pop()
}
