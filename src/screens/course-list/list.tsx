import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { Course } from 'type/course'
import { CourseCard } from './card'

interface ListProps {
  courses: Course[]
}

export const CourseList: React.FC<ListProps> = ({ courses }) => {
  return (
    <>
      <Row>
        {courses?.map((course) => {
          return (
            <Col span={6} key={course.id}>
              <Link to={`course/detail/${course.id}`}>
                <CourseCard course={course}></CourseCard>
              </Link>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
