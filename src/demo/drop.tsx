import styled from '@emotion/styled'

export const Drop = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
  border-radius: 51% 49% 48% 52% / 62% 44% 56% 38%;
  opacity: 0.8;

  ::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: #318cfe;
    border-radius: 51% 49% 48% 52% / 62% 44% 56% 38%;
    box-shadow: -20px 30px 16px #1b6cfb, -40px 60px 32px #1b6cfb,
      inset -6px 6px 10px #1b6cfb, inset 2px 6px 10px #1a74e5,
      inset 20px -20px 22px white, inset 40px -40px 44px #a8ceff;
  }

  ::after {
    content: '';
    position: absolute;
    height: 40px;
    width: 40px;
    background: #e6fdfb;
    border-radius: 44% 56% 46% 54% / 36% 50% 50% 64%;
    left: 130px;
    top: 40px;
    box-shadow: 16px 40px 0 -10px white;
    opacity: 0.8;
  }

  left: -100px;
  top: -50px;
`
