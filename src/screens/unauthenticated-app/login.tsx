import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from 'antd'
import { useAsync } from 'utils/use-async'
import { useJumpTo } from 'utils'

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void
}) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const backHome = useJumpTo('/')

  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    await run(login(values))
      .then(() => backHome())
      .catch((e) => {
        onError(new Error(e))
      })
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
          loading={isLoading}
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
