import styled from '@emotion/styled'
import { Button, Layout, Menu, Typography, Dropdown } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import { LogoSvg } from './lib'
import { Search } from 'components/search'
import { useReducer } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from 'i18n/config'
import { useAuth } from 'context/auth-context'

export const Header: React.FC = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <HeaderContainer>
      <Logo />
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[pathname]}
        style={{ flex: 1 }}
      >
        <Menu.Item key={'/'}>
          <Link to={'/'}>{t('header.home')}</Link>
        </Menu.Item>
        <Menu.Item key={'/course'}>
          <Link to={'/course'}>{t('header.course_list')}</Link>
        </Menu.Item>
      </Menu>
      <LanguageMenu />
      <Search placeholder={t('header.search_panel')} />
      {user ? (
        <User />
      ) : (
        <ButtonGroup
          style={{
            alignItems: 'center',
          }}
        >
          <Button type="link">
            <Link to={'/register'}>{t('header.register')}</Link>
          </Button>
          <Button type="link">
            <Link to={'/login'}>{t('header.login')}</Link>
          </Button>
        </ButtonGroup>
      )}
    </HeaderContainer>
  )
}

export const LogoImg = styled.img`
  height: 5rem;
  width: 5rem;
  float: left;
  margin: 0.7rem 0;
`

const Logo = () => {
  return (
    <Link to={'/'} style={{ display: 'flex', alignItems: 'center' }}>
      <LogoSvg size={'5rem'} />
      <Typography.Title
        level={3}
        style={{
          display: 'inline-block',
          lineHeight: '6.4rem',
          margin: '0 2rem 0 0',
        }}
      >
        SooMooc
      </Typography.Title>
    </Link>
  )
}

const HeaderContainer = styled(Layout.Header)`
  background: white;
  display: flex;
  box-shadow: 0 2px 8px #f0f1f2;
  height: 6.4rem;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
`

interface LanguageState {
  language: 'zh' | 'en'
  languageList: { name: string; code: string }[]
}

const defaultLanguageState: LanguageState = {
  language: 'zh',
  languageList: [
    {
      name: '中文',
      code: 'zh',
    },
    {
      name: 'Englist',
      code: 'en',
    },
  ],
}

const LanguageReducer = (
  state: LanguageState = defaultLanguageState,
  action: { type: string; text: 'zh' | 'en' }
) => {
  if (action.type === 'TOGGLE_LANGUAGE') {
    return { ...state, language: action.text }
  }
  return state
}

const LanguageMenu = () => {
  const [state, dispatch] = useReducer(LanguageReducer, defaultLanguageState)
  const toggleLanguage = () => {
    const action: { type: string; text: 'zh' | 'en' } = {
      type: 'TOGGLE_LANGUAGE',
      text: state.language === 'zh' ? 'en' : 'zh',
    }
    dispatch(action)
    i18n.changeLanguage(action.text)
  }

  return (
    <Button onClick={toggleLanguage}>
      {state.language === 'zh' ? 'English' : '中文'}
    </Button>
  )
}

const User = () => {
  const { logout, user } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <Button onClick={logout} type={'link'}>
              登出
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
