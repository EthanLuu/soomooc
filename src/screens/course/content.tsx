import { CourseProps } from 'type/course'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Descriptions, Row, Tabs } from 'antd'
import { Teacher } from 'type/user'
import { Phone } from 'demo/phone'

export const CourseContent = ({
  courseDetail,
}: {
  courseDetail: CourseProps | undefined
}) => {
  const { TabPane } = Tabs

  return (
    <Row
      justify={'space-between'}
      align={'middle'}
      style={{
        flex: 1,
        padding: '2rem 0',
      }}
    >
      <Phone />
      <Col
        span={12}
        style={{ padding: '2rem', fontSize: '3.2rem' }}
      >{`${courseDetail?.info}`}</Col>
      <Col
        span={6}
        style={{
          padding: '1rem 1rem',
          borderRadius: 10,
          boxShadow: '0 13px 15px rgba(0, 0, 0, 0.11)',
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="直播状态" key="1">
            <LiveCard course={courseDetail} />
          </TabPane>
          <TabPane tab="讲师介绍" key="2">
            <TeacherCard />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

const TeacherCard = () => {
  const teacher: Teacher = {
    _id: '1',
    name: 'Ethan',
    info: '慕课网热门讲师，在慕课网推出多个热门课程，学员评价极高。八年研发及团队管理经验，从普通程序员到技术总监的成长经历，让他对程序员面临的各种问题深有体会；精通Python、Node.js、JavaScript、PHP等语言，对各类技术的发展方向非常了解。',
  }
  return (
    <Card
      style={{
        textAlign: 'justify',
        overflow: 'hidden',
        borderRadius: 10,
        border: 'none',
      }}
    >
      <Card.Meta
        style={{ textOverflow: 'ellipsis' }}
        title={teacher.name}
        description={teacher.info}
      />
    </Card>
  )
}

const LiveCard = ({ course }: { course?: CourseProps }) => {
  const status = course?.roomStatus
  const time = new Date(status?.startTime || '')?.toLocaleString()
  const { isLive, watchers, post } = status || {}
  const desc = (
    <Descriptions title={isLive ? '正在直播中' : '暂未开播'} column={1}>
      <Descriptions.Item label={isLive ? '开播时间' : '上次开播时间'}>
        {time}
      </Descriptions.Item>
      {isLive ? (
        <Descriptions.Item label={'观看人数'}>{watchers}</Descriptions.Item>
      ) : null}
      <Descriptions.Item label={'直播间公告'}>{post}</Descriptions.Item>
    </Descriptions>
  )

  return (
    <Link to={`/course/live/${course?._id}`}>
      <Card
        style={{ borderRadius: 10, border: 'none' }}
        actions={[<Button>进入直播间</Button>]}
      >
        {desc}
      </Card>
    </Link>
  )
}
