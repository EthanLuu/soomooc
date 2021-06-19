import useRequest from '@ahooksjs/use-request'
import styled from '@emotion/styled'
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Switch,
} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useCoursesContext } from 'context/course-context'
import { useState } from 'react'
import { CourseProps, RoomStatus } from 'type/course'
import { useHttp } from 'utils/http'

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

  const clickToCopy = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        message.success('复制成功')
      })
      .catch((e) => {
        message.error('复制失败' + e)
      })
  }

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
        const old = myCourses?.find((c) => c._id === values.id)
        const url = `rtmp://121.43.155.202/live/${values.id}`
        if (old) {
          old.roomStatus = roomStatus
        }
        if (values.isLive) {
          Modal.success({
            content: (
              <p onClick={() => clickToCopy(url)}>
                开启直播成功，请在 OBS 中输入推流地址：{url}
              </p>
            ),
            width: 520,
          })
        } else {
          message.success('关闭成功')
        }
      })
      .catch((error) => {
        message.error('修改失败')
        console.log(error)
      })
  }

  const [checked, setChecked] = useState(false)

  const onCourseChange = (id: string) => {
    const course = myCourses?.find((course) => course._id === id)
    setChecked(course?.roomStatus.isLive || false)
    form.setFieldsValue({
      post: course?.roomStatus?.post,
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
                <Select.Option key={course._id} value={course._id}>
                  {course.title}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="直播间公告" name="post" shouldUpdate>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="开启直播" name="isLive" shouldUpdate>
          <Switch checked={checked} onClick={() => setChecked(!checked)} />
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
