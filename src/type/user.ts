export interface User {
  _id: string
  username: string
  password: string
  token: string
  courses: String[]
  privilegeType: number;  // 标识用户身份，0=>管理员，1=>教师，2=>学生/游客
}


export interface Teacher {
  _id: string
  name: string
  info: string
}