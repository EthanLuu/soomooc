import { Tabs } from 'antd'
import { PageTitle } from 'components/lib'
import { CourseManagement } from './course'
import { LiveManagement } from './live'

export const ManagementScreen = () => {
  const { TabPane } = Tabs
  return (
    <>
      <PageTitle title={'后台管理'} />
      <Tabs tabPosition={'left'}>
        <TabPane tab="课程管理" key="1">
          <CourseManagement />
        </TabPane>
        <TabPane tab="直播管理" key="2">
          <LiveManagement />
        </TabPane>
        {/* <TabPane tab="用户管理" key="3"></TabPane> */}
      </Tabs>
    </>
  )
}
