import { useLocation } from 'react-router'
import { Breadcrumb as AntdCrumb } from 'antd'
import { Link } from 'react-router-dom'

const breadcrumbNameMap: { [url: string]: string } = {
  '/course': '课程列表',
  '/management': '后台管理',
}

export const BreadCrumb = () => {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    let url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    let name = ''
    if (url in breadcrumbNameMap) {
      name = breadcrumbNameMap[url]
    } else if (url.indexOf('course') >= 0 && index === 1) {
      name = '课程详情'
      url = pathSnippets.length >= 3 ? `/course/${pathSnippets[2]}` : url
    } else if (url.indexOf('live') >= 0) {
      name = '直播间'
    }
    return (
      <AntdCrumb.Item key={url}>
        <Link to={url}>{name}</Link>
      </AntdCrumb.Item>
    )
  })
  const breadcrumbItems = [
    <AntdCrumb.Item key="home">
      <Link to="/">首页</Link>
    </AntdCrumb.Item>,
  ].concat(extraBreadcrumbItems)
  return (
    <AntdCrumb style={{ marginBottom: '1rem' }}>{breadcrumbItems}</AntdCrumb>
  )
}
