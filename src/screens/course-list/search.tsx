import { FullPageLoading, PageTitle } from 'components/lib'
import qs from 'qs'
import { useLocation } from 'react-router'
import { SearchCourseParams } from 'utils'
import { useCourses } from 'utils/course'
import { CourseList } from './list'

export const SeachCourseScreen = () => {
  const location = useLocation()
  const params: SearchCourseParams = qs.parse(location.search.slice(1))
  const { data: courses, loading } = useCourses()
  const result = courses?.filter((course) => {
    if (
      params.w &&
      !course.title?.toLocaleUpperCase().includes(params.w?.toLocaleUpperCase())
    ) {
      return false
    } else if (params.d && course.direction !== params.d) {
      return false
    } else if (params.t && course.type !== params.t) {
      return false
    }
    return true
  })
  return loading ? (
    <FullPageLoading />
  ) : (
    <>
      <PageTitle title={'搜索结果'} />
      <CourseList courses={result || []} />
    </>
  )
}
