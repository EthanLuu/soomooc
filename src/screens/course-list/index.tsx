import { useEffect, useState } from 'react'
import { Course } from 'type/course'
import { useHttp } from 'utils/http'
import { CourseList } from './list'
import { Divider, Row } from 'antd'

export const CourseListScreen: React.FC = () => {
  const client = useHttp()
  const [courses, setCourses] = useState<Course[]>([])
  useEffect(() => {
    client('course').then((courses) => {
      setCourses(courses)
    })
  }, [client])
  return (
    <>
      <Row style={{ justifyContent: 'center' }}>
        <h1>全部课程</h1>
      </Row>
      <Divider />
      <CourseList courses={courses}></CourseList>
    </>
  )
}
