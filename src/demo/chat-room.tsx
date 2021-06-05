import io, { Socket } from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'
import { Input } from 'antd'
import { useAuth } from 'context/auth-context'

export const ChatRoom = () => {
  const [socket, setSocket] = useState<typeof Socket | null>(null)
  const socketUrl = 'http://localhost:3333'
  const [messages, setMessages] = useState<string[]>([])
  const { user } = useAuth()

  console.log(user)

  useEffect(() => {
    setSocket(io(socketUrl))
  }, [socketUrl])

  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => {
      console.log('connected')
      socket.emit('join', user?.username)
    })
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    socket.on('msgToClient', (message: string) => {
      setMessages((messages) => [...messages, message])
    })
  }, [socket])

  const input = useRef<any>('')

  const sendMessage = () => {
    console.log(input.current.input.value)
    socket?.emit('msgToServer', input.current.input.value)
    input.current.input.value = ''
  }

  return (
    <div>
      <h2>Welcome to Socket.IO App!</h2>
      <Input ref={input} />
      <button onClick={sendMessage}>sendMessage</button>
      {messages.map((message, index) => (
        <h2 key={index}>{message}</h2>
      ))}
    </div>
  )
}
