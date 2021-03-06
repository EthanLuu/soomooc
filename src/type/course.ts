export interface CourseProps {
  _id: string
  title: string
  cover: string // 封面图片地址
  direction: string // 方向：前端，后端...
  type: string // 类别：Vue，React
  numberOfStudents: number // 学生人数
  info: string // 课程的详细介绍
  roomStatus: RoomStatus // 描述课程状态
}

export interface RoomStatus {
  isLive: boolean
  watchers: number
  post: string
  startTime: Date | null
}
