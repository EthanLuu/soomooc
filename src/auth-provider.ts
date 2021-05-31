import { User } from 'type/user'

const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = async (data: { username: string; password: string }) => {
  const response = await fetch(`${apiUrl}/user?username=${data.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const res = await response.json()
  console.log(res)
  const user = res.data
  if (!user || data.password !== user.password) {
    return Promise.reject('用户名或密码错误❌')
  } else if (response.ok && data.password === user.password) {
    return handleUserResponse(user)
  } else {
    return Promise.reject(res)
  }
}

export const register = async (data: {
  username: string
  password: string
}) => {
  const user = { ...data, token: Math.random().toString(36).slice(-6) }
  const response = await fetch(`${apiUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  if (response.ok) {
    return handleUserResponse(await response.json())
  } else {
    return Promise.reject(await response.json())
  }
}

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
