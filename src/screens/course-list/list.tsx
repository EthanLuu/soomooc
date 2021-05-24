import { Col, Row } from 'antd'
import { CourseProps } from 'type/course'
import { CourseCard } from './card'

interface ListProps {
  courses: CourseProps[]
}

export const CourseList: React.FC<ListProps> = ({ courses }) => {
  return (
    <>
      <Row gutter={24}>
        {courses?.map((course) => {
          return (
            <Col span={6} key={course.id}>
              <CourseCard course={course}></CourseCard>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
