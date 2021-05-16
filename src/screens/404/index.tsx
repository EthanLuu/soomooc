import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="未知资源"
      extra={
        <Button type="primary">
          <Link to={'/'}>返回首页</Link>
        </Button>
      }
    />
  )
}
