import Icon from '@ant-design/icons/lib/components/Icon'
import styled from '@emotion/styled'
import { ReactComponent as Logo } from '@/assets/phone.svg'

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  > .phone {
    background-color: #fff;
    border: 5px solid black;
    border-radius: 25px;
    box-shadow: 0 0.9px 2.2px rgba(0, 0, 0, 0.039),
      0 2.2px 5.3px rgba(0, 0, 0, 0.048), 0 4.1px 10px rgba(0, 0, 0, 0.052),
      0 7.4px 17.9px rgba(0, 0, 0, 0.057), 0 13.8px 33.4px rgba(0, 0, 0, 0.067),
      0 33px 80px rgba(0, 0, 0, 0.11);
    height: 400px;
    overflow: hidden;
    position: relative;
    width: 230px;
  }
  > .x {
    pointer-events: none;
    position: absolute;
    top: 0;
  }
`

export const Phone = () => {
  return (
    <Container>
      <div className="phone">
        <Icon component={Logo} style={{ fontSize: '40rem' }} />
      </div>
    </Container>
  )
}
