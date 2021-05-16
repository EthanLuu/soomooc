import styled from '@emotion/styled'
import { Image, Carousel as AntCarousel } from 'antd'
import { useEffect, useState } from 'react'
import { useHttp } from 'utils/http'

interface CarouselImageProp {
  id: number
  title: string
  url: string
}

export const Carousel = () => {
  const client = useHttp()
  const [imageUrls, setImageUrls] = useState<CarouselImageProp[]>([])

  useEffect(() => {
    client('carousel').then((urls: CarouselImageProp[]) => {
      setImageUrls(urls)
    })
  }, [])

  return (
    <CarouselContainer autoplay>
      {imageUrls.map((image) => (
        <Image src={image.url} key={image.id} object-fit={'cover'} />
      ))}
    </CarouselContainer>
  )
}

const CarouselContainer = styled(AntCarousel)`
  text-align: center;
  height: 40rem;
  line-height: 40rem;
  overflow: hidden;
`
