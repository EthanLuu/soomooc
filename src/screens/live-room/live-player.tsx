import { useEffect, useRef } from 'react'
import flvjs from 'flv.js'

interface LivePlayerProps {
  type?: string
  url: string
  isLive: boolean
}

export const LivePlayer = (props: LivePlayerProps) => {
  const flvRef = useRef<flvjs.Player>()
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (flvjs.isSupported()) {
      flvRef.current = flvjs.createPlayer({
        type: 'flv',
        cors: true,
        ...props,
      })
      flvRef.current.on('error', (error) => {
        flvRef.current?.destroy()
      })
      if (videoRef.current && props.isLive) {
        flvRef.current.attachMediaElement(videoRef.current)
        flvRef.current.load()
        const playPromise = flvRef.current.play()
        if (playPromise) {
          //立即关闭报错解决方法
          playPromise
            .then(() => {
              // 音频加载成功
              // 音频的播放需要耗时
              console.log('视频加载成功')
              console.log('时长', flvRef.current?.duration + 's')
            })
            .catch((e) => {
              // 音频加载失败
              console.log('视频加载失败')
            })
        }
      }
    }
  }, [props])

  return (
    <div style={{ height: '50rem' }}>
      <video ref={videoRef} className={'video'} height={'100%'} controls>
        {`Your browser is too old which doesn't support HTML5 video.`}
      </video>
    </div>
  )
}
