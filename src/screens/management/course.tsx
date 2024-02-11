import { Button, Divider, Form, Input, message, Space, Table } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { CourseProps } from '@/type/course'
import { useCourses } from '@/utils/course'
import { useHttp } from '@/utils/http'
import { useRequest } from 'ahooks'
import styled from '@emotion/styled'

export const CourseManagement = () => {
  return (
    <Container>
      <CourseTable />
      <Divider />
      <Container style={{ width: '50%' }}>
        <h2 style={{ marginBottom: '2rem' }}>添加课程</h2>
        <AddCourseForm />
      </Container>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
  text-align: center;
`

const AddCourseForm = () => {
  const [form] = useForm()
  const client = useHttp()
  const addCourse = async (course: CourseProps) => {
    return await client('course', {
      method: 'POST',
      data: course,
    })
  }

  const { run, loading } = useRequest<CourseProps, any>(addCourse, {
    manual: true,
    onSuccess: () => message.success('添加成功'),
    onError: () => message.error('添加失败'),
  })

  const handleSubmit = (values: Partial<CourseProps>) => {
    values.roomStatus = {
      isLive: false,
      startTime: null,
      watchers: 0,
      post: '',
    }
    values.numberOfStudents = 0
    run(values)
    form.resetFields()
  }
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      form={form}
      layout="horizontal"
      onFinish={handleSubmit}
    >
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

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Space size={'middle'}>
          <Button type="primary" htmlType="submit" loading={loading}>
            确定
          </Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

const CourseTable = () => {
  const { data: courses } = useCourses()
  const directionFilters: { text: string; value: string }[] = []
  const typeFilters: { text: string; value: string }[] = []
  const visitedDirections: string | string[] = []
  const visitedTypes: string[] = []
  // eslint-disable-next-line
  courses?.map(course => {
    const { direction, type } = course
    if (visitedDirections.indexOf(direction) === -1) {
      visitedDirections.push(direction)
      directionFilters.push({
        text: direction,
        value: direction,
      })
    }
    if (visitedTypes.indexOf(type) === -1) {
      visitedTypes.push(type)
      typeFilters.push({
        text: type,
        value: type,
      })
    }
  })
  const columns = [
    {
      title: '课程名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '方向',
      dataIndex: 'direction',
      key: 'direction',
      filters: directionFilters,
      onFilter: (value: any, record: { direction: any }) =>
        record.direction === value,
    },
    {
      title: '类别',
      dataIndex: 'type',
      key: 'type',
      filters: typeFilters,
      onFilter: (value: any, record: { type: any }) => record.type === value,
    },
    {
      title: '学生数',
      dataIndex: 'numberOfStudents',
      key: 'numberOfStudents',
      sorter: (a: CourseProps, b: CourseProps) =>
        a.numberOfStudents - b.numberOfStudents,
    },
    {
      title: '封面图片地址',
      dataIndex: 'cover',
      key: 'cover',
    },
  ]

  return <Table columns={columns} dataSource={courses} />
}
