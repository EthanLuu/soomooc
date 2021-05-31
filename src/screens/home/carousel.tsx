import styled from '@emotion/styled'
import { Image, Carousel as AntCarousel } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CourseProps } from 'type/course'
import { useHttp } from 'utils/http'

export const Carousel: React.FC = () => {
  const client = useHttp()
  const [courses, setCourses] = useState<CourseProps[]>([])

  useEffect(() => {
    client('course/courses').then((courses: CourseProps[]) => {
      setCourses(courses.slice(0, 4))
    })
  }, [client])

  return (
    <CarouselContainer autoplay effect={'fade'}>
      {courses.map((course) => (
        <Link to={`/course/${course._id}`} key={course._id}>
          <Image
            style={{ objectFit: 'cover', height: '40rem' }}
            src={course.cover}
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
