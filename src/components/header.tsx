import styled from '@emotion/styled'
import { Button, Col, Layout, Menu, Row, Typography } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import { LogoSvg } from './lib'
import { Search } from './search'
import { useReducer } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n/config'
import { useAuth } from '@/context/auth-context'
import { User } from './user'

export const Header: React.FC = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { user } = useAuth()

  const menuItems = [
    {
      label: t('header.home'),
      key: '/',
    },
    {
      label: t('header.course_list'),
      key: '/course',
    },
    ...(user && user.privilegeType <= 1
      ? [
          {
            label: t('header.management'),
            key: '/management',
          },
        ]
      : []),
  ]

  return (
    <HeaderContainer>
      <Logo />
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[pathname]}
        style={{ flex: 1, borderBottom: 'none' }}
        items={menuItems.map(item => ({
          ...item,
          label: <Link to={item.key}>{item.label}</Link>,
        }))}
      ></Menu>
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

const Logo = () => {
  return (
    <Link to={'/'} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <HeaderTitle
        gutter={24}
        align="middle"
        justify="center"
        style={{ flexWrap: 'nowrap' }}
      >
        <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
          <LogoSvg size={'3rem'} />
        </Col>
        <Col span={0} md={18}>
          <h3 style={{ margin: 0, fontSize: '2rem' }}>SooMooc</h3>
        </Col>
      </HeaderTitle>
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
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  backdrop-filter: blur(3px);
`

const HeaderTitle = styled(Row)`
  :hover {
    color: #1890ff;
  }
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
