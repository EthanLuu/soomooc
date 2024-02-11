import { useAuth } from '@/context/auth-context'
import { Button, Form, Input } from 'antd'
import { useJumpTo } from '@/utils'
import { useRequest } from 'ahooks'

export const LoginScreen = ({
  onError,
}: {
  onError: (error: string) => void
}) => {
  const { login } = useAuth()
  const backHome = useJumpTo('/')
  const { run, loading } = useRequest(login, {
    manual: true,
    onSuccess: backHome,
    onError: e => onError(e.message),
  })

  const handleSubmit = (values: { username: string; password: string }) => {
    run(values)
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
      <Form.Item>
        <Button
          loading={loading}
          style={{ width: '100%' }}
          htmlType={'submit'}
          type={'primary'}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
