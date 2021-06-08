import { Row, Divider } from 'antd'
import { CourseList } from 'screens/course-list/list'
import { useCoursesContext } from 'context/course-context'
export const MyCourseScreen = () => {
  const { courses } = useCoursesContext()
  return (
    <>
      <Row justify={'center'}>
        <h1>我的课程</h1>
      </Row>
      <Divider />
      <CourseList courses={courses || []}></CourseList>
    </>
  )
}
