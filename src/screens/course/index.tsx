import { CourseBanner } from './banner'
import { Row } from 'antd'
import { FullPageLoading } from 'components/lib'
import { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { CourseDetailProps, CourseProps } from 'type/course'
import { useHttp } from 'utils/http'
// import { LiveDemo } from 'demo'

interface MatchParams {
  courseId: string
}

export const CourseDetailScreen: React.FC<RouteComponentProps<MatchParams>> = (
  props
) => {
  const courseId = props.match.params.courseId
  const client = useHttp()

  const [courseDetail, setCourseDetail] =
    useState<CourseDetailProps | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const course: CourseProps = await client(`course/${courseId}`)
      const detail: CourseDetailProps[] = await client(
        `course/${courseId}/detail`
      )
      setCourseDetail({ ...detail?.[0], ...course })
    }
    fetchData()
  }, [client, courseId])
  return !courseDetail ? (
    <FullPageLoading />
  ) : (
    <>
      <CourseBanner courseDetail={courseDetail} />
      <Row justify={'center'}>{`${courseDetail?.info}`}</Row>
      {/* <LiveDemo id={courseId} /> */}
    </>
  )
}
