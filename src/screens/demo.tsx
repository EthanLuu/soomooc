import { LivePlayer } from 'components/live-player'
import styled from '@emotion/styled'

export const Demo = () => {
  return (
    <PlayerContainer>
      <LivePlayer url="http://localhost:7001/live/demo.flv" type="flv" />
    </PlayerContainer>
  )
}

const PlayerContainer = styled.div`
  text-align: center;
`
