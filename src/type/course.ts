export interface Course {
  id: number
  title: string
  cover: string // 封面图片地址
  direction: string // 方向：前端，后端...
  type: string // 类别：Vue，React
  numberOfStudents: number // 学生人数
}
