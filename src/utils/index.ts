import qs from 'qs'
import { useHistory } from 'react-router'

export interface SearchCourseParams {
  w?: string // 关键词
  d?: string // 方向
  t?: string // 类别
}

export const useJumpTo = (url: string) => {
  const history = useHistory()
  return () => {
    history.push(url)
  }
}

export const useSearchCourse = (params: SearchCourseParams) => {
  const history = useHistory()
  return () => {
    history.push(`/search?${qs.stringify(params)}`)
  }
}
