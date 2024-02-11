import { Button, Card, Input, Form } from 'antd'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { http } from '@/utils/http'

interface UserProps {
  id: number
  username: 'string'
  password: 'string'
}

export const UsersList = () => {
  const [users, setUsers] = useState([])
  const [form] = Form.useForm()

  const renderUsers = () => {
    http('users').then((users: any) => {
      setUsers(users)
    })
  }

  // 初次加载时渲染users
  useEffect(() => {
    renderUsers()
  }, [])

  const deleteUser = async (id: number) => {
    const config = {
      method: 'DELETE',
    }
    http(`users/${id}`, config).then(() => {
      form.resetFields()
      renderUsers()
    })
  }

  const addUser = async (values: { username: string; password: string }) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    }
    http('users', config).then(() => {
      form.resetFields()
      renderUsers()
    })
  }

  return (
    <Container>
      <UsersContainer>
        {users.map((user: UserProps) => (
          <Card
            title={`id:${user.id}`}
            key={user.id}
            style={{ width: 200, margin: 30 }}
            extra={<Button onClick={() => deleteUser(user.id)}>x</Button>}
          >
            <p>username: {user.username}</p>
            <p>password: {user.password}</p>
          </Card>
        ))}
      </UsersContainer>

      <Form
        onFinish={addUser}
        form={form}
        style={{
          textAlign: 'center',
          padding: '10px',
          border: '1px solid #ccc',
          boxShadow: '3px 3px 3px #ccc',
          borderRadius: '5px',
        }}
      >
        <Form.Item name={'username'}>
          <Input placeholder={'用户名'} />
        </Form.Item>
        <Form.Item name={'password'}>
          <Input placeholder={'密码'} />
        </Form.Item>
        <Form.Item>
          <Button htmlType={'submit'} type={'primary'}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </Container>
  )
}

const UsersContainer = styled.div`
  font-size: 2rem;
  height: 30vh;
  width: 80%;
  display: flex;
  border: 1px solid #ccc;
  box-shadow: 3px 3px 3px #ccc;
  border-radius: 5px;
  margin: 30px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
