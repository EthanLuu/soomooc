import { useAuth } from '@/context/auth-context'
import { Button, Form, Input } from 'antd'
import { useJumpTo } from '@/utils'
import { useRequest } from 'ahooks'

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: string) => void
}) => {
  const { register } = useAuth()
  const { run, loading } = useRequest(register, {
    manual: true,
    throwOnError: true,
  })
  const backHome = useJumpTo('/')

  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== values.password) {
      onError('请确认两次输入的密码相同')
      return
    }

    run(values)
      .then(() => backHome())
      .catch(onError)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'用户名'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'密码'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: '请确认密码' }]}
      >
        <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
      </Form.Item>
      <Form.Item>
        <Button
          style={{ width: '100%' }}
          loading={loading}
          htmlType={'submit'}
          type={'primary'}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}
