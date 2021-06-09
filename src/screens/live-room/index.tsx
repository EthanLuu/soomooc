import styled from '@emotion/styled'
import { Button, Result } from 'antd'
import { BreadCrumb } from 'components/breadcrumb'
import { FullPageLoading } from 'components/lib'
import { RouteComponentProps } from 'react-router-dom'
import { useJumpTo } from 'utils'
import { useCourseById } from 'utils/course'
import { ChatRoom } from './chat-room'
import { LivePlayer } from './live-player'

export const LiveRoomScreen: React.FC<
  RouteComponentProps<{ courseId: string }>
> = (props) => {
  const courseId = props.match.params.courseId
  const { data: course, loading } = useCourseById(courseId)
  const LiveStatus = course?.roomStatus
  if (loading) return <FullPageLoading />
  return (
    <>
      <BreadCrumb />
      {!LiveStatus?.isLive ? (
        <NotLive />
      ) : (
        <div>
          <h1>{course?.title}</h1>
          <Container>
            <LivePlayer
              url={`http://121.43.155.202:8080/live/${courseId}.flv`}
              type="flv"
              isLive={LiveStatus.isLive}
            />
            <ChatRoom />
          </Container>
        </div>
      )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NotLive = () => {
  const goHome = useJumpTo('/')
  return (
    <Result
      title="当前课程尚未开播"
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      extra={
        <Button type="primary" key="console" onClick={goHome}>
          返回首页
        </Button>
      }
    />
  )
}
