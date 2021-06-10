import { Col, Pagination, Row } from 'antd'
import { useEffect, useState } from 'react'
import { CourseProps } from 'type/course'
import { CourseCard } from './card'

interface ListProps {
  courses: CourseProps[]
}

export const CourseList: React.FC<ListProps> = ({ courses }) => {
  const [curCourses, setCurCourses] = useState<CourseProps[]>([])
  useEffect(() => {
    setCurCourses(courses.slice(0, 16))
  }, [courses])
  const onChange = (pageNumber: number) => {
    setCurCourses(courses.slice((pageNumber - 1) * 16, pageNumber * 16))
  }

  return (
    <div style={{ height: '100%' }}>
      <Row gutter={24} align={'middle'}>
        {curCourses?.map((course) => {
          return (
            <Col span={6} key={course._id}>
              <CourseCard course={course}></CourseCard>
            </Col>
          )
        })}
      </Row>
      <Row justify={'center'}>
        <Pagination
          style={{ textAlign: 'center' }}
          showQuickJumper
          defaultCurrent={1}
          total={courses.length}
          onChange={onChange}
          showSizeChanger={false}
          pageSize={16}
        />
      </Row>
    </div>
  )
}
