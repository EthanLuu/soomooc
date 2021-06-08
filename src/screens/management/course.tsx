import useRequest from '@ahooksjs/use-request'
import styled from '@emotion/styled'
import { Form, Input, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { LongButton } from 'components/lib'
import { CourseProps } from 'type/course'
import { useHttp } from 'utils/http'

export const CourseManagement = () => {
  const [form] = useForm()
  const client = useHttp()
  const addCourse = async (course: CourseProps) => {
    return await client('course', {
      method: 'POST',
      data: course,
    })
  }

  const { run, loading } = useRequest<CourseProps>(addCourse, {
    manual: true,
    throwOnError: true,
  })

  const handleSubmit = (values: Partial<CourseProps>) => {
    values.roomStatus = {
      isLive: false,
      startTime: null,
      watchers: 0,
    }
    values.numberOfStudents = 0
    run(values)
      .then(() => {
        message.success('添加成功')
      })
      .catch((error) => {
        message.error('添加失败')
        console.log(error)
      })
  }

  return (
    <Container>
      <Form form={form} layout="horizontal" onFinish={handleSubmit}>
        <Form.Item
          label="课程名称"
          name="title"
          rules={[{ required: true, message: '请输入课程名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="封面地址"
          name="cover"
          rules={[{ required: true, message: '请输入封面地址' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="课程方向"
          name="direction"
          rules={[{ required: true, message: '请输入课程方向' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="课程类别"
          name="type"
          rules={[{ required: true, message: '请输入课程类别' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="课程简介"
          name="info"
          rules={[{ required: true, message: '请输入课程简介' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 3 }}>
          <LongButton type="primary" htmlType="submit" loading={loading}>
            添加
          </LongButton>
        </Form.Item>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
  width: 50%;
`
