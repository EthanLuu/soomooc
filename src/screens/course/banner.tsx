import styled from '@emotion/styled'
import { CourseProps } from 'type/course'

export const CourseBanner = ({
  courseDetail,
}: {
  courseDetail: CourseProps
}) => {
  return (
    <TitleContainer style={{ backgroundImage: `url(${courseDetail.cover})` }}>
      <Title>
        <div
          style={{ fontSize: '3.5rem', fontWeight: 600 }}
        >{`${courseDetail?.title}`}</div>
        <div
          style={{ fontSize: '1.5rem' }}
        >{`${courseDetail?.direction} | ${courseDetail?.type} | ${courseDetail?.numberOfStudents} 人正在学习`}</div>
      </Title>
    </TitleContainer>
  )
}

const TitleContainer = styled.div`
  display: flex;
  height: 20rem;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
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
