import { CourseBanner } from './banner'
import { FullPageLoading } from '@/components/lib'
import { RouteComponentProps } from 'react-router'
import { BreadCrumb } from '@/components/breadcrumb'
import { CourseContent } from './content'
import { useCourseById } from '@/utils/course'

export default (props: RouteComponentProps<{ courseId: string }>) => {
  const courseId = props.match.params.courseId
  const { data: course, loading } = useCourseById(courseId)
  return loading ? (
    <FullPageLoading />
  ) : (
    <>
      <BreadCrumb />
      <CourseBanner courseDetail={course} />
      <CourseContent courseDetail={course} />
    </>
  )
}
