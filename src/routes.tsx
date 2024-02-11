import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { FullPageLoading } from './components/lib'

// 使用React.lazy进行动态导入
const HomePage = React.lazy(() => import('@/screens/home'))
const NotFoundPage = React.lazy(() => import('@/screens/404'))
const CourseListScreen = React.lazy(() => import('@/screens/course-list'))
const CourseDetailScreen = React.lazy(() => import('@/screens/course'))
const UnauthenticatedApp = React.lazy(
  () => import('@/screens/unauthenticated-app')
)
const LiveRoomScreen = React.lazy(() => import('@/screens/live-room'))
const MyCourseScreen = React.lazy(
  () => import('@/screens/course-list/my-course')
)
const ManagementScreen = React.lazy(() => import('@/screens/management'))
const SeachCourseScreen = React.lazy(
  () => import('@/screens/course-list/search')
)

export const Routes = () => {
  return (
    <Suspense fallback={<FullPageLoading />}>
      {/* 使用Loader组件作为fallback */}
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route exact path={'/course'} component={CourseListScreen} />
        <Route
          exact
          path={'/course/live/:courseId'}
          component={LiveRoomScreen}
        />
        <Route
          exact
          path={'/course/:courseId'}
          component={CourseDetailScreen}
        />
        <Route exact path={'/mycourse'} component={MyCourseScreen} />
        <Route exact path={'/login'} component={UnauthenticatedApp} />
        <Route exact path={'/register'} component={UnauthenticatedApp} />
        <Route exact path={'/management'} component={ManagementScreen} />
        <Route exact path={'/search'} component={SeachCourseScreen} />
        <Route path={'*'} component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}
