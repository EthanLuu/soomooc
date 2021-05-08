import { useEffect, useRef } from 'react'
import flvjs from 'flv.js'

interface LivePlayerProps {
  type?: string
  url: string
}

export const LivePlayer = (props: LivePlayerProps) => {
  const flvRef = useRef<flvjs.Player>()
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (flvjs.isSupported()) {
      flvRef.current = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        cors: true,
        ...props,
      })
      if (videoRef.current) {
        flvRef.current.attachMediaElement(videoRef.current)
        flvRef.current.load()
      }
    }
  }, [props])

  return (
    <div className={'video-container'}>
      <video ref={videoRef} className={'video'} width="80%" controls>
        {`Your browser is too old which doesn't support HTML5 video.`}
      </video>
    </div>
  )
}
