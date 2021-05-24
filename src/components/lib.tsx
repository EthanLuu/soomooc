import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'

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
