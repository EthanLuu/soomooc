import { CourseProps } from 'type/course'
import { Link } from 'react-router-dom'
import { Button, Card, Row, Tabs } from 'antd'
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
      justify={'center'}
      align={'top'}
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: '2rem 0',
      }}
    >
      <div
        style={{
          width: '25%',
          backgroundColor: '#fff',
          padding: '1rem 1rem',
          borderRadius: 10,
          boxShadow: '0 13px 15px rgba(0, 0, 0, 0.11)',
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="直播状态" key="1">
            <LiveCard id={courseDetail?._id} />
          </TabPane>
          <TabPane tab="讲师介绍" key="2">
            <TeacherCard />
          </TabPane>
        </Tabs>
      </div>
      <div
        style={{
          flex: 2,
          display: 'flex',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
          }}
        >
          {`${courseDetail?.info}`}
        </div>

        <Phone />
      </div>
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

const LiveCard = ({ id }: { id?: string }) => {
  const status = {
    isLive: true,
    startTime: new Date(),
  }

  const time = status.startTime.toLocaleString()
  const desc = status.isLive ? (
    <>
      <p style={{ marginBottom: 0 }}>{`开播时间：${time}`}</p>
      <p>{`观看人数：${Math.floor(Math.random() * 100)}`}</p>
    </>
  ) : (
    <>
      <p style={{ marginBottom: 0 }}>{`上次直播时间：${time}`}</p>
    </>
  )

  return (
    <Link to={`/course/live/${id}`}>
      <Card
        style={{ borderRadius: 10 }}
        actions={[<Button>进入直播间</Button>]}
      >
        <Card.Meta
          title={status.isLive ? '正在直播中' : '尚未开播'}
          description={desc}
        />
      </Card>
    </Link>
  )
}
