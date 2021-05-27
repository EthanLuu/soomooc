import { Layout } from 'antd'

export const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
      SooMooc ©2021 Created by{' '}
      <a target="_blank" href={'https://ethanloo.top'} rel="noreferrer">
        EthanLoo
      </a>
    </Layout.Footer>
  )
}
