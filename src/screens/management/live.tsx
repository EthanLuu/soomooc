import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  message,
} from 'antd'
import { CourseProps, RoomStatus } from '@/type/course'

import styled from '@emotion/styled'
import { useCoursesContext } from '@/context/course-context'
import { useForm } from 'antd/lib/form/Form'
import { useHistory } from 'react-router-dom'
import { useHttp } from '@/utils/http'
import { useRequest } from 'ahooks'
import { useState } from 'react'

export const LiveManagement = () => {
  const [form] = useForm()
  const client = useHttp()
  const history = useHistory()
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

  const { run, loading } = useRequest<CourseProps, any>(editLive, {
    manual: true,
    onSuccess: values => {
      const old = myCourses?.find(c => c._id === values._id)
      const serverUrl = 'rtmp://121.43.155.202/live/'
      const password = values._id
      if (old) {
        old.roomStatus = values.roomStatus
      }
      if (checked) {
        Modal.confirm({
          onOk: () => history.push('/course/live/' + password),
          okText: '跳转直播间',
          cancelText: '关闭',
          content: (
            <div>
              <p>开启直播成功，请在 OBS 中进行推流配置</p>
              <p onClick={() => clickToCopy(serverUrl)}>
                服务器：<span>{serverUrl}</span>
              </p>
              <p onClick={() => clickToCopy(password)}>
                串流密钥：<span>{password}</span>
              </p>
            </div>
          ),
          width: 520,
        })
      } else {
        message.success('关闭成功')
      }
    },
    onError: () => message.error('关闭失败'),
  })

  const clickToCopy = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        message.success('复制成功')
      })
      .catch(e => {
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
  }

  const [checked, setChecked] = useState(false)

  const onCourseChange = (id: string) => {
    const course = myCourses?.find(course => course._id === id)
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
            {myCourses?.map(course => {
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
