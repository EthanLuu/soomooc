import { CourseList } from './list'
import { useCourses } from '@/utils/course'
import { FullPageLoading, PageTitle } from '@/components/lib'

export default () => {
  const { loading, data: courses } = useCourses()

  return (
    <>
      <PageTitle title={'课程列表'} />
      {loading ? (
        <FullPageLoading />
      ) : (
        <CourseList courses={courses || []}></CourseList>
      )}
    </>
  )
}
