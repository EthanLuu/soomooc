import { CourseProps } from '@/type/course'
import { Col, Row } from 'antd'
import { CourseCard } from '../course-list/card'
import styled from '@emotion/styled'

export const SlideList = ({ courses }: { courses: CourseProps[] }) => {
  return (
    <Container gutter={16}>
      {courses.map(course => {
        return (
          <Col span={6} key={course._id}>
            <CourseCard course={course}></CourseCard>
          </Col>
        )
      })}
    </Container>
  )
}

const Container = styled(Row)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
`
