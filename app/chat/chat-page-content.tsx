'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MainNav } from '@/components/main-nav'
import { ChatSidebar } from '@/components/chat-sidebar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Bell, Download, FileText, ImageIcon, Paperclip } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetChatById } from '@/hooks/use-get-chat-by-id'
import { useGetMessages } from '@/hooks/use-get-messages'
import { formatDate } from '@/utils'
import { api } from '@/http'
import { useQueryClient } from '@tanstack/react-query'
import { io } from 'socket.io-client' // Import Socket.IO client

type FileMessage = {
  url: string
  mimeType: string
  originalName: string
  size: number
}

type Message = {
  _id: string
  text?: string
  files?: FileMessage[]
  isMine: boolean
  createdAt: string
  sender?: {
    _id: string
    name: string
    avatar?: string
  }
}

type ChatRecipient = {
  gender: string
  _id: string
  name: string
  avatar?: string
  role: string
}

type ChatData = {
  recipient: ChatRecipient
}

export default function ChatPage() {
  const queryClient = useQueryClient()
  const [files, setFiles] = useState<File[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [alertStatus, setAlertStatus] = useState(false)
  const params = useSearchParams()
  const { chat } = useGetChatById(params.get('id') as string) as { chat?: ChatData }
  const { data: messages } = useGetMessages(params.get('id') as string) as { data?: Message[] }
  const router = useRouter()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const socket = useRef<any>(null)

  useEffect(() => {

    socket.current = io('http://jedel-jardem.space/socket.io/')

    socket.current.on('receive-message', (message: Message) => {

      console.log('New message received:', message)
      queryClient.invalidateQueries({ queryKey: ['messages', params.get('id')] })
    })

    return () => {
      if (socket.current) socket.current.disconnect()
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() && files.length === 0) return

    const formData = new FormData()
    formData.append('chatId', params.get('id') as string)
    if (newMessage.trim()) {
      formData.append('text', newMessage)
    }

    files.forEach((file) => {
      formData.append('files', file, file.name)
    })

    try {
      await api.post('/messages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      socket.current.emit('send-message', {
        chat: params.get('id'),
        text: newMessage,
        files,
      })

      setNewMessage('')
      setFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      queryClient.invalidateQueries({ queryKey: ['messages', params.get('id')] })
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const toggleAlert = () => {
    setAlertStatus((prev) => !prev)
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <main className="flex flex-1 flex-col">
          {chat?.recipient ? (
            <>
              <div onClick={() => router.push(`/user/${chat?.recipient._id}`)} className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage className="object-cover" src={chat.recipient?.gender + ".jpg"} />
                    <AvatarFallback className="bg-black text-white">
                      {chat.recipient.name.split(' ').map((n) => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{chat.recipient.name}</h2>
                    <p className="text-xs text-gray-500">{chat.recipient.role}</p>
                  </div>
                </div>
                <Button
                  variant={alertStatus ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={toggleAlert}
                  className="flex items-center gap-1"
                >
                  <Bell className="h-4 w-4" />
                  <span>{alertStatus ? 'Alert Off' : 'Alert On'}</span>
                </Button>
              </div>

              {alertStatus && (
                <Alert className="m-4 border-red-500 bg-red-50 text-red-800">
                  <Bell className="h-4 w-4" />
                  <AlertTitle>Alert Status Active</AlertTitle>
                  <AlertDescription>
                    You have activated the alert status for this conversation.
                  </AlertDescription>
                </Alert>
              )}

              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
              >
                {messages && messages.length > 0 ? (
                  messages.map((message) => (
                    <div key={message._id} className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-lg p-3 space-y-2 ${
                        message.isMine ? 'bg-[#1E7F6E] text-white' : 'bg-gray-100'
                      }`}>
                        {message.text && <p>{message.text}</p>}

                        {message.files?.map((file, i) => {
                          if (!file) {
                            console.warn(`File at index ${i} is null or undefined`)
                            return null
                          }

                          const mimeType = file.mimeType || 'application/octet-stream'
                          const isImage = mimeType.startsWith('image/')

                          return (
                            <div key={i} className="border rounded-md p-2 bg-white/10">
                              <div className="flex items-center gap-2">
                                {getFileIcon(mimeType)}
                                <span className="text-sm font-medium truncate max-w-[150px]">
                                  {file.originalName || `file-${i + 1}`}
                                </span>
                                <span className="text-xs opacity-70">
                                  {file.size ? formatFileSize(file.size) : 'Unknown size'}
                                </span>
                                {file.url && (
                                  <a
                                    href={"http://jedel-jardem.space" + file.url}
                                    download={file.originalName || `file-${i + 1}`}
                                    className="ml-auto"
                                  >
                                    <Download className="h-4 w-4" />
                                  </a>
                                )}
                              </div>

                              {isImage && file.url && (
                                <div className="mt-2">
                                  <img
                                    src={file.url}
                                    alt={file.originalName || `Image ${i + 1}`}
                                    className="max-w-xs max-h-48 rounded-md border border-gray-300"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLImageElement).style.display = 'none'
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )
                        })}
                        <p className={`text-right text-xs ${
                          message.isMine ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400">No messages yet.</div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2 items-center">
                <div className="relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    className="hidden"
                  />
                </div>

                {files.length > 0 && (
                  <div className="absolute bottom-16 left-0 right-0 px-4">
                    <div className="bg-white p-2 rounded-md border shadow-sm max-w-md mx-auto">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Attachments ({files.length})</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setFiles([])
                            if (fileInputRef.current) fileInputRef.current.value = ''
                          }}
                          className="text-xs text-red-500"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="space-y-2">
                        {files.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            {file.type.startsWith('image/') ? (
                              <ImageIcon className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            <span className="truncate flex-1">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" className="bg-[#1E7F6E] hover:bg-[#1E7F6E]/90">
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              Chat is not selected yet
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
