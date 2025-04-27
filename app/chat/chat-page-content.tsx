'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MainNav } from '@/components/main-nav'
import { ChatSidebar } from '@/components/chat-sidebar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Bell } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetChatById } from '@/hooks/use-get-chat-by-id'
import { useGetMessages } from '@/hooks/use-get-messages'
import { formatDate } from '@/utils'
import { useSendMessageMutation } from '@/hooks/use-send-message-mutation'

export default function ChatPageContent() {
  const [newMessage, setNewMessage] = useState('')
  const [alertStatus, setAlertStatus] = useState(false)
  const params = useSearchParams()
  const { chat } = useGetChatById(params.get('id') as string)
  const { messages } = useGetMessages(params.get('id') as string)
  const { mutate } = useSendMessageMutation()
  const router = useRouter()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    mutate({ chatId: params.get('id') as string, text: newMessage })

    setNewMessage('')
  }

  const toggleAlert = () => {
    setAlertStatus(!alertStatus)
  }

  return (

    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <main className="flex flex-1 flex-col">
          {chat ? <>
            <div className="border-b p-4 flex items-center justify-between">
              <div onClick={() => router.push('/user/' + chat?.recipient?._id)}
                   className="flex items-center gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src={chat.recipient.avatar} alt={chat.recipient.name} />
                  <AvatarFallback className="bg-gradient-to-br from-pink-400 to-violet-500 text-white">
                    {chat.recipient.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
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

            <div className="h-full max-h-[600px] flex flex-col overflow-y-scroll">
              {alertStatus && (
                <Alert className="m-4 border-red-500 bg-red-50 text-red-800">
                  <Bell className="h-4 w-4" />
                  <AlertTitle>Alert Status Active</AlertTitle>
                  <AlertDescription>
                    You have activated the alert status for this conversation. The user will be notified
                    of
                    an urgent
                    matter.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((message) => (
                  <div key={message._id}
                       className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isMine
                          ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-right text-xs ${message.isMine ? 'text-white/70' : 'text-gray-500'}`}>
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" className="bg-gradient-to-r from-pink-500 to-violet-500">
                Send
              </Button>
            </form>
          </> : <div className="h-full w-full flex items-center justify-center">
            Chat is not selected yet
          </div>}
        </main>
      </div>
    </div>
  )
}
