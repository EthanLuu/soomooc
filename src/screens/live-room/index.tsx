import { BreadCrumb } from '@/components/breadcrumb'
import { FullPageLoading } from '@/components/lib'
import { RouteComponentProps } from 'react-router-dom'
import { useCourseById } from '@/utils/course'
import styled from '@emotion/styled'
import { ChatRoom } from './chat-room'
import { LivePlayer } from './live-player'
import { Col, Row } from 'antd'

export const LiveRoomScreen: React.FC<
  RouteComponentProps<{ courseId: string }>
> = props => {
  const courseId = props.match.params.courseId
  const { data: course, loading } = useCourseById(courseId)
  const LiveStatus = course?.roomStatus
  const liveSrc = `http://localhost:8080/live/${courseId}.flv`

  if (loading) return <FullPageLoading />
  return (
    <>
      <BreadCrumb />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 'auto',
        }}
      >
        <h1>{course?.title}</h1>
        <Row style={{ border: '1px solid #eee', margin: '0 -5rem' }}>
          <Col span={24} md={18}>
            <VideoContainer>
              <LivePlayer
                url={liveSrc}
                type="flv"
                isLive={LiveStatus?.isLive || false}
              />
            </VideoContainer>
          </Col>
          <Col span={6} md={6}>
            <ChatRoom />
          </Col>
        </Row>
      </div>
    </>
  )
}

const VideoContainer = styled.div`
  width: 100%;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
`
