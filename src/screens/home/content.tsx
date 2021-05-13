import styled from '@emotion/styled'
import { Row, Col } from 'antd'
import { Carousel } from 'screens/home/carousel'
import { SideMenu } from './side-menu'

export const Content = () => {
  return (
    <Container>
      <Banner>
        <Col span={6}>
          <SideMenu />
        </Col>
        <Col span={18}>
          <Carousel />
        </Col>
      </Banner>
    </Container>
  )
}

const Container = styled.div`
  padding: 3rem 10rem;
  margin: 0 auto;
  min-height: calc(100vh - 134px);
`

const Banner = styled(Row)`
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1.9px 4px rgba(0, 0, 0, 0.044),
    0 4.6px 13.4px rgba(0, 0, 0, 0.066), 0 26px 60px rgba(0, 0, 0, 0.11);
`
