/* @jsxImportSource @emotion/react */
import { LivePlayer } from 'demo/live-player'
import styled from '@emotion/styled'

export const Demo = () => {
  return (
    <PlayerContainer>
      <h2 css={{ 'fontSize': '3rem' }}>SooMooc Demo</h2>
      <LivePlayer url="http://localhost:7001/live/demo.flv" type="flv" />
    </PlayerContainer>
  )
}

const PlayerContainer = styled.div`
  text-align: center;
`
