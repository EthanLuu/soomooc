import qs from 'qs'
import { useCallback } from 'react'

interface Config extends RequestInit {
  data?: object
}

const apiUrl = process.env.REACT_APP_API_URL

export const http = async (
  endpoint: string,
  { data, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      const res = await response.json()
      if (response.ok) {
        return res.data
      } else {
        return Promise.reject(data)
      }
    })
}

export const useHttp = () => {
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config }),
    []
  )
}
