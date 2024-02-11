import { Route, Switch } from 'react-router-dom'
import { HomePage } from '@/screens/home'
import { NotFoundPage } from '@/screens/404'
import { CourseListScreen } from '@/screens/course-list'
import { CourseDetailScreen } from '@/screens/course'
import { UnauthenticatedApp } from '@/screens/unauthenticated-app'
import { LiveRoomScreen } from '@/screens/live-room'
import { MyCourseScreen } from '@/screens/course-list/my-course'
import { ManagementScreen } from '@/screens/management'
import { SeachCourseScreen } from '@/screens/course-list/search'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path={'/'} component={HomePage} />
      <Route exact path={'/course'} component={CourseListScreen} />
      <Route exact path={'/course/live/:courseId'} component={LiveRoomScreen} />
      <Route exact path={'/course/:courseId'} component={CourseDetailScreen} />
      <Route exact path={'/mycourse'} component={MyCourseScreen} />
      <Route exact path={'/login'} component={UnauthenticatedApp} />
      <Route exact path={'/register'} component={UnauthenticatedApp} />
      <Route exact path={'/management'} component={ManagementScreen} />
      <Route exact path={'/search'} component={SeachCourseScreen} />
      <Route path={'*'} component={NotFoundPage} />
    </Switch>
  )
}
