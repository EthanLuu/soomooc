import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { CourseProps } from 'type/course'
import { useCourses } from 'utils/course'
import { useHttp } from 'utils/http'
import { useAuth } from './auth-context'

// 定义全局状态用来控制课程订阅

const CourseContext =
  createContext<
    | {
        courses: CourseProps[] | null | undefined
        subscribe: (course: CourseProps) => Promise<void>
        unsubscribe: (course: CourseProps) => Promise<void>
      }
    | undefined
  >(undefined)
CourseContext.displayName = 'CourseContext'

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const client = useHttp()
  const { user } = useAuth()
  const { data: coursesAll } = useCourses()
  const [courses, setCourses] = useState<CourseProps[]>([])

  useEffect(() => {
    const myCourses = coursesAll?.filter((course) =>
      user?.courses.includes(course._id)
    )
    setCourses(myCourses || [])
  }, [coursesAll, user])

  const subscribe = async (newCourse: CourseProps) => {
    const newCourses = [...(courses || []), newCourse]
    const config = {
      method: 'POST',
      data: {
        courses: newCourses,
      },
    }
    await client(`user/editcourses/${user?._id}`, config)
    return setCourses(newCourses)
  }

  const unsubscribe = async (oldCourse: CourseProps) => {
    const newCourses = courses?.filter((course) => course._id !== oldCourse._id)
    const config = {
      method: 'POST',
      data: {
        courses: newCourses,
      },
    }
    await client(`user/editcourses/${user?._id}`, config)
    return setCourses(newCourses)
  }

  return (
    <CourseContext.Provider
      children={children}
      value={{ courses, subscribe, unsubscribe }}
    />
  )
}

export const useCoursesContext = () => {
  const context = useContext(CourseContext)
  if (!context) {
    throw new Error('useCoursesContext必须在CourseProvider中使用')
  }
  return context
}
