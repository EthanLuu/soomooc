import styled from '@emotion/styled'
import { Card as AntCard } from 'antd'
import { CourseProps } from 'type/course'
import { Link } from 'react-router-dom'

export const CourseCard: React.FC<{ course: CourseProps }> = ({ course }) => {
  const { _id, title, cover, direction, type, numberOfStudents } = course
  return (
    <Link to={`course/${_id}`}>
      <Card hoverable cover={<Cover src={cover}></Cover>}>
        <AntCard.Meta title={title} />
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

const Card = styled(AntCard)`
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0 6px 10px 0 rgb(95 101 105 / 15%);
  transition: all 0.2s;
  :hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px 0 rgb(95 101 105 / 15%);
  }
`

const Description = styled.div`
  margin-top: 10px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
