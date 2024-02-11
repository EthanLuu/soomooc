import { Tabs } from 'antd'
import { PageTitle } from '@/components/lib'
import { useAuth } from '@/context/auth-context'
import { CourseManagement } from './course'
import { LiveManagement } from './live'
import { UserManagement } from './user'

export default () => {
  const { TabPane } = Tabs
  const { user } = useAuth()
  return (
    <>
      <PageTitle title={'后台管理'} />
      <Tabs tabPosition={'left'}>
        {user?.privilegeType === 0 ? (
          <>
            <TabPane tab="课程管理" key="1">
              <CourseManagement />
            </TabPane>
            <TabPane tab="用户管理" key="2">
              <UserManagement />
            </TabPane>
          </>
        ) : null}
        <TabPane tab="直播管理" key="3">
          <LiveManagement />
        </TabPane>
      </Tabs>
    </>
  )
}
