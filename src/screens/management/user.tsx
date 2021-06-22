import { Table } from 'antd'
import { User } from 'type/user'
import { useAllUsers, userTypeMap } from 'utils/user'

type userDataProps = User & {
  type: string
}

export const UserManagement = () => {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'token',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: '身份',
      dataIndex: 'type',
      key: 'type',
      sorter: (a: User, b: User) => a.privilegeType - b.privilegeType,
    },
  ]

  const { data: users } = useAllUsers()
  const userData = []
  for (let user of users || []) {
    userData.push({ ...user, type: userTypeMap[user.privilegeType] })
  }

  return <Table dataSource={userData} columns={columns}></Table>
}
