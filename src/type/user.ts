export interface User {
  _id: string
  username: string
  password: string
  token: string
  courses: String[]
}


export interface Teacher {
  _id: string
  name: string
  info: string
}