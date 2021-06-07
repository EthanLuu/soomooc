import { CourseList } from './list'
import { Divider, Row } from 'antd'
import { useCourses } from 'utils/course'

export const CourseListScreen: React.FC = () => {
  const { data: courses } = useCourses()

  return (
    <>
      <Row justify={'center'}>
        <h1>全部课程</h1>
      </Row>
      <Divider />
      <CourseList courses={courses || []}></CourseList>
    </>
  )
}
