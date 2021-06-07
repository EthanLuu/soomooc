import { Button, Menu, Dropdown } from 'antd'
import { useAuth } from 'context/auth-context'
import { useJumpTo } from 'utils'

export const User = () => {
  const { logout, user } = useAuth()
  const goToMyCourse = useJumpTo('/mycourse')
  return (
    <Dropdown
      overlay={
        <Menu style={{ textAlign: 'center' }}>
          <Menu.Item key={'my-course'}>
            <Button onClick={goToMyCourse} type={'link'}>
              我的课程
            </Button>
          </Menu.Item>
          <Menu.Item key={'logout'}>
            <Button onClick={logout} type={'link'}>
              登出账号
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={'link'} onClick={(e) => e.preventDefault()}>
        Hi, {user?.username}
      </Button>
    </Dropdown>
  )
}
