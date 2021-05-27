import { User } from 'type/user'

const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/users?username=${data.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const res = await response.json()
    const user = res?.[0]
    if (!user || data.password !== user.password) {
      return Promise.reject('用户名或密码错误❌')
    } else if (response.ok && data.password === user.password) {
      return handleUserResponse(user)
    } else {
      return Promise.reject(res)
    }
  })
}

export const register = (data: { username: string; password: string }) => {
  const user = { ...data, token: Math.random().toString(36).slice(-6) }
  return fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
