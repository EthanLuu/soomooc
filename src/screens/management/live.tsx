import useRequest from '@ahooksjs/use-request'
import styled from '@emotion/styled'
import { Button, Form, Input, message, Select, Space, Switch } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useCoursesContext } from 'context/course-context'
import { CourseProps, RoomStatus } from 'type/course'
import { useHttp } from 'utils/http'
import { useMyCourses } from 'utils/user'

export const LiveManagement = () => {
  const [form] = useForm()
  const client = useHttp()
  const { courses: myCourses = [] } = useCoursesContext()
  const editLive = async (course: Partial<CourseProps>) => {
    return await client('course/edit', {
      method: 'POST',
      data: {
        _id: course._id,
        roomStatus: course.roomStatus,
      },
    })
  }

  const { run, loading } = useRequest<CourseProps>(editLive, {
    manual: true,
    throwOnError: true,
  })

  const handleSubmit = (values: {
    id: string
    post: string
    isLive: boolean
  }) => {
    const roomStatus: RoomStatus = {
      post: values.post,
      isLive: values.isLive,
      watchers: 0,
      startTime: null,
    }
    if (values.isLive) {
      roomStatus.startTime = new Date()
    }
    run({
      _id: values.id,
      roomStatus,
    })
      .then(() => {
        message.success('添加成功')
      })
      .catch((error) => {
        message.error('添加失败')
        console.log(error)
      })
  }

  const onCourseChange = (id: string) => {
    const course = myCourses?.find((course) => course._id === id)
    form.setFieldsValue({
      post: course?.roomStatus?.post,
      isLive: course?.roomStatus?.isLive,
    })
  }

  return (
    <Container>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        form={form}
        labelAlign={'right'}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="课程名称"
          name="id"
          rules={[{ required: true, message: '请选择课程' }]}
        >
          <Select onChange={onCourseChange}>
            {myCourses?.map((course) => {
              return (
                <Select.Option value={course._id}>{course.title}</Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="直播间公告" name="post">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="打开直播" name="isLive">
          <Switch />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space size={'middle'}>
            <Button type="primary" htmlType="submit" loading={loading}>
              确定
            </Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
  width: 50%;
`
