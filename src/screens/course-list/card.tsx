import styled from '@emotion/styled'
import { Card } from 'antd'
import { Course } from 'type/course'

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { title, cover, direction, type, numberOfStudents } = course
  return (
    <Card
      hoverable
      style={{
        width: '90%',
        margin: '0 10px 20px 10px',
        borderRadius: 5,
      }}
      cover={<Cover src={cover}></Cover>}
    >
      <Card.Meta
        title={title}
        // description={`${direction} | ${type} | ${numberOfStudents}人报名`}
      />
      <Description>{`${direction} | ${type} | ${numberOfStudents}人报名`}</Description>
    </Card>
  )
}

const Cover = styled.img`
  height: 15rem;
  border-radius: 5px 5px 0 0 !important;
  object-fit: cover;
`
const Description = styled.div`
  margin-top: 5px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
