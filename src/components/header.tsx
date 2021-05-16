import styled from '@emotion/styled'
import { Button, Layout, Menu, Row, Typography } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import logo from 'assets/logo.svg'
import { Search } from 'components/search'
import { Link, useLocation } from 'react-router-dom'

export const Header: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <Layout.Header
      style={{
        background: 'white',
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px #f0f1f2',
      }}
    >
      <Row style={{ height: '6.4rem', alignItems: 'center' }}>
        <Logo />
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[pathname]}
          style={{ background: 'white', border: 'none', flex: 'auto' }}
        >
          <Menu.Item key="/">
            <Link to={'/'}>首页</Link>
          </Menu.Item>
          <Menu.Item key="/course">
            <Link to={'/course'}>课程</Link>
          </Menu.Item>
        </Menu>
        <Search />
        <ButtonGroup
          style={{
            alignItems: 'center',
          }}
        >
          <Button type="link">
            <Link to={'/register'}>注册</Link>
          </Button>
          <Button type="link">
            <Link to={'/login'}>登陆</Link>
          </Button>
        </ButtonGroup>
      </Row>
    </Layout.Header>
  )
}

const LogoImg = styled.img`
  height: 5rem;
  width: 5rem;
  float: left;
  margin: 0.7rem 0;
`

const Logo = () => {
  return (
    <Link to={'/'} style={{ width: '20rem' }}>
      <LogoImg src={logo} alt="logo" />
      <Typography.Title
        level={3}
        style={{
          lineHeight: '6.4rem',
          marginBottom: 0,
          marginLeft: '6rem',
        }}
      >
        SooMooc
      </Typography.Title>
    </Link>
  )
}
