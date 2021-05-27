import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'
import { ReactComponent as Logo } from 'assets/logo.svg'
import Icon from '@ant-design/icons/lib/components/Icon'

const FullPage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
  </FullPage>
)

export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size={'large'} />
    </FullPage>
  )
}

export const LogoSvg = ({ size }: { size?: string }) => {
  return <Icon component={Logo} style={{ fontSize: size }} />
}
