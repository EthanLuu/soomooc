import styled from '@emotion/styled'
import { Image, Carousel as AntCarousel } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from 'utils/http'

interface CarouselImageProp {
  id: number
  title: string
  url: string
  courseId: number
}

export const Carousel: React.FC = () => {
  const client = useHttp()
  const [imageUrls, setImageUrls] = useState<CarouselImageProp[]>([])

  useEffect(() => {
    client('carousel').then((urls: CarouselImageProp[]) => {
      setImageUrls(urls)
    })
  }, [client])

  return (
    <CarouselContainer autoplay arrows={true} effect={'fade'}>
      {imageUrls.map((image) => (
        <Link to={`/course/detail/${image.courseId}`} key={image.id}>
          <Image
            src={image.url}
            object-fit={'cover'}
            preview={false}
          />
        </Link>
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
