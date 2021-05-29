import { FullPageLoading, FullPageErrorFallback } from 'components/lib'
import React, { createContext, ReactNode } from 'react'
import * as auth from 'auth-provider'
import { User } from 'type/user'
import { http } from 'utils/http'
import { useRequest } from 'ahooks'

interface AuthForm {
  username: string
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http(`users`, { data: { token } })
    user = data?.[0]
  }
  return user
}

const AuthContext =
  createContext<
    | {
        user: User | null | undefined
        register: (form: AuthForm) => Promise<void>
        login: (form: AuthForm) => Promise<void>
        logout: () => Promise<void>
      }
    | undefined
  >(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    loading,
    mutate,
  } = useRequest<User | null>(bootstrapUser, { throwOnError: true })

  const login = (form: AuthForm) => auth.login(form).then(mutate)
  const register = (form: AuthForm) => auth.register(form).then(mutate)
  const logout = () => auth.logout().then(() => mutate(null))

  if (loading) {
    return <FullPageLoading />
  }

  if (error) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
