import { CourseList } from './list'
import { useCourses } from 'utils/course'
import { PageTitle } from 'components/lib'

export const CourseListScreen: React.FC = () => {
  const { data: courses } = useCourses()

  return (
    <>
      <PageTitle title={'课程列表'} />
      <CourseList courses={courses || []}></CourseList>
    </>
  )
}
