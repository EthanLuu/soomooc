import { CourseBanner } from './banner'
import { Row } from 'antd'
import { FullPageLoading } from 'components/lib'
import { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { CourseProps } from 'type/course'
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

  const [courseDetail, setCourseDetail] = useState<CourseProps | null>(null)

  useEffect(() => {
    client(`course/${courseId}`).then(setCourseDetail)
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
