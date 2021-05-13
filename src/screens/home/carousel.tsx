import styled from '@emotion/styled'
import { Image, Carousel as AntCarousel } from 'antd'
import { useEffect, useState } from 'react'
import { http } from 'utils/http'

interface CarouselImageProp {
  id: number
  title: string
  url: string
}

export const Carousel = () => {
  const [imageUrls, setImageUrls] = useState<CarouselImageProp[]>([])

  useEffect(() => {
    http('carousel').then((urls: CarouselImageProp[]) => {
      setImageUrls(urls)
    })
  }, [])

  return (
    <CarouselContainer autoplay>
      {console.log(imageUrls)}
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
