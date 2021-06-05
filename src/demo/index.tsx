/* @jsxImportSource @emotion/react */
import { LivePlayer } from 'screens/live-room/live-player'
import styled from '@emotion/styled'

export const LiveDemo = ({ id }: { id: string }) => {
  return (
    <PlayerContainer>
      <LivePlayer
        url={`http://121.43.155.202:8080/live/${id}.flv`}
        type="flv"
      />
    </PlayerContainer>
  )
}

const PlayerContainer = styled.div`
  text-align: center;
`
