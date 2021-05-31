import { useEffect, useState } from 'react'
import { CourseProps } from 'type/course'
import { useHttp } from 'utils/http'
import { CourseList } from './list'
import { Divider, Row } from 'antd'

export const CourseListScreen: React.FC = () => {
  const client = useHttp()
  const [courses, setCourses] = useState<CourseProps[]>([])
  useEffect(() => {
    client('course/courses').then(setCourses)
  }, [client])

  return (
    <>
      <Row justify={'center'}>
        <h1>全部课程</h1>
      </Row>
      <Divider />
      <CourseList courses={courses}></CourseList>
    </>
  )
}
