export interface CourseProps {
  id: number
  title: string
  cover: string // 封面图片地址
  direction: string // 方向：前端，后端...
  type: string // 类别：Vue，React
  numberOfStudents: number // 学生人数
}

export interface CourseDetailProps extends CourseProps {
  courseId: number // 对应的课程id
  info: string // 课程的详细介绍
}
