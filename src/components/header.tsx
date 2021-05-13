import styled from '@emotion/styled'
import { Button, Layout, Menu, Row, Typography } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import logo from 'assets/logo.svg'
import { Search } from 'components/search'

export const Header = () => {
  return (
    <Layout.Header
      style={{
        background: 'white',
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px #f0f1f2',
      }}
    >
      <Row style={{ height: '6.4rem', alignItems: 'center' }}>
        <a href={'/'} style={{ width: '20rem' }}>
          <Logo src={logo} alt="logo" />
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
        </a>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ background: 'white', border: 'none', flex: 'auto' }}
        >
          <Menu.Item key="1">首页</Menu.Item>
          <Menu.Item key="2">课程</Menu.Item>
        </Menu>
        <Search />
        <ButtonGroup
          style={{
            alignItems: 'center',
          }}
        >
          <Button type="link">注册</Button>
          <Button type="link">登陆</Button>
        </ButtonGroup>
      </Row>
    </Layout.Header>
  )
}

const Logo = styled.img`
  height: 5rem;
  width: 5rem;
  float: left;
  margin: 0.7rem 0;
`
