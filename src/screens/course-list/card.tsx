import styled from '@emotion/styled'
import { Card } from 'antd'
import { CourseProps } from 'type/course'
import { Link } from 'react-router-dom'

export const CourseCard: React.FC<{ course: CourseProps }> = ({ course }) => {
  const { _id, title, cover, direction, type, numberOfStudents } = course
  return (
    <Link to={`course/${_id}`}>
      <Card
        hoverable
        style={{
          borderRadius: 10,
          marginBottom: 20,
        }}
        cover={<Cover src={cover}></Cover>}
      >
        <Card.Meta title={title} />
        <Description>{`${direction} | ${type} | ${numberOfStudents}人报名`}</Description>
      </Card>
    </Link>
  )
}

const Cover = styled.img`
  height: 15rem;
  border-radius: 10px 10px 0 0 !important;
  object-fit: cover;
`
const Description = styled.div`
  margin-top: 10px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
