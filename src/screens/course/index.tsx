import { CourseBanner } from './banner'
import { Button, Row } from 'antd'
import { FullPageLoading } from 'components/lib'
import { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { CourseProps } from 'type/course'
import { useHttp } from 'utils/http'
import { Link } from 'react-router-dom'

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
      <Row
        justify={'center'}
        align={'middle'}
        style={{ flex: 'auto', flexDirection: 'column' }}
      >
        <div>
          <h2>{`${courseDetail?.info}`}</h2>
        </div>
        <div>
          <Link to={`/course/live/${courseId}`}>
            <Button>进入直播间</Button>
          </Link>
        </div>
      </Row>
    </>
  )
}
