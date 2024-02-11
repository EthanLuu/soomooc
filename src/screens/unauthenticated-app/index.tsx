import styled from '@emotion/styled'
import { Typography, notification } from 'antd'
import { useLocation } from 'react-router'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'
import { LogoSvg } from '@/components/lib'

export const UnauthenticatedApp = () => {
  const url = useLocation()
  const showError = (error: string) => {
    notification.open({
      key: error,
      message: error,
    })
  }
  return (
    <Container>
      <Title>
        <Typography.Title level={2}>
          <span style={{ marginRight: 12, fontSize: '5rem' }}>SooMooc</span>
          <LogoSvg size={'6rem'} />
        </Typography.Title>
        <p>你的不二之选</p>
      </Title>
      <FromContainer>
        {url.pathname === '/login' ? (
          <LoginScreen onError={showError} />
        ) : (
          <RegisterScreen onError={showError} />
        )}
      </FromContainer>
    </Container>
  )
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`
const Title = styled.div`
  user-select: none;
  font-size: 5rem;
  margin-right: 15%;
  p {
    white-space: nowrap;
    margin-bottom: 0;
  }
`

const FromContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  border: none;
  padding: 2rem 1rem 0 1rem;
  background-color: #fff;
  min-width: 30rem;
  input,
  button {
    font-size: 2rem;
    height: 4rem;
  }
  position: relative;
`
