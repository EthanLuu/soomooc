import styled from '@emotion/styled'
import { Rate, Tag } from 'antd'
import { useCoursesContext } from '@/context/course-context'
import { useState } from 'react'
import { CourseProps } from '@/type/course'
import { useSearchCourse } from '@/utils'

export const CourseBanner = ({
  courseDetail,
}: {
  courseDetail: CourseProps | undefined
}) => {
  const { courses, subscribe, unsubscribe } = useCoursesContext()
  const [star, setStar] = useState(
    courses?.some((course) => course._id === courseDetail?._id) || false
  )

  const toggleStar = () => {
    if (!courseDetail) return
    if (star) {
      unsubscribe(courseDetail).then(() => setStar(!star))
    } else {
      subscribe(courseDetail).then(() => setStar(!star))
    }
  }

  return (
    <Container style={{ backgroundImage: `url(${courseDetail?.cover})` }}>
      <Title>
        <div
          style={{
            fontSize: '3.5rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rate
            defaultValue={star ? 1 : 0}
            count={1}
            style={{ fontSize: '3.5rem', marginRight: '2rem', lineHeight: 1 }}
            onChange={toggleStar}
          />
          {`${courseDetail?.title}`}
        </div>
        <Tags detail={courseDetail} />
      </Title>
    </Container>
  )
}

const Tags = ({ detail }: { detail?: CourseProps }) => {
  const { direction, type, numberOfStudents } = detail || {}
  const searchByDirection = useSearchCourse({ d: direction })
  const searchByType = useSearchCourse({ t: type })
  return (
    <div style={{ fontSize: '1.5rem' }}>
      <Tag
        onClick={searchByDirection}
        style={{ cursor: 'pointer' }}
        color="magenta"
      >
        {direction}
      </Tag>
      <Tag onClick={searchByType} style={{ cursor: 'pointer' }} color="red">
        {type}
      </Tag>
      <Tag color="blue">{numberOfStudents} 人正在学习</Tag>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  height: 20rem;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 1rem;
`

const Title = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  padding: 3rem 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
`
