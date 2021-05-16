import styled from '@emotion/styled'
import { Col, Row } from 'antd'

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
            <Col span={6}>
              <CourseCard key={course.id} course={course}></CourseCard>
            </Col>
          )
        })}
        {courses?.map((course) => {
          return (
            <Col span={6}>
              <CourseCard key={course.id} course={course}></CourseCard>
            </Col>
          )
        })}
        {courses?.map((course) => {
          return (
            <Col span={6}>
              <CourseCard key={course.id} course={course}></CourseCard>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
