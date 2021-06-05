import styled from '@emotion/styled'
import { RouteComponentProps } from 'react-router-dom'
import { ChatRoom } from './chat-room'
import { LivePlayer } from './live-player'

export const LiveRoomScreen: React.FC<
  RouteComponentProps<{ courseId: string }>
> = (props) => {
  const courseId = props.match.params.courseId
  return (
    <>
      <h1>{`直播间`}</h1>
      <Container>
        <LivePlayer
          url={`http://121.43.155.202:8080/live/${courseId}.flv`}
          type="flv"
        />
        <ChatRoom />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
