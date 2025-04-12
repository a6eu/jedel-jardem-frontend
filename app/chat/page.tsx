'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MainNav } from '@/components/main-nav'
import { ChatSidebar } from '@/components/chat-sidebar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Bell } from 'lucide-react'

// Sample data for the chat
const chatData = {
  user: {
    id: 1,
    name: 'Dr. Sarah Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    specialization: 'Cardiology',
    isOnline: true
  },
  messages: [
    {
      id: 1,
      sender: 'user',
      content: 'Hello! I read your post about cardiac imaging techniques. Very interesting!',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      sender: 'recipient',
      content: 'Thank you! I\'m glad you found it interesting. Do you work in cardiology as well?',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      sender: 'user',
      content:
        'Yes, I specialize in interventional cardiology. I\'ve been looking into new imaging methods for my research.',
      timestamp: '10:35 AM'
    },
    {
      id: 4,
      sender: 'recipient',
      content: 'That\'s great! I\'d be happy to share more details about the techniques we used in our study.',
      timestamp: '10:38 AM'
    }
  ]
}

export default function ChatPage() {
  const params = useParams()
  const chatId = params.id
  console.log(chatId)

  const [messages, setMessages] = useState(chatData.messages)
  const [newMessage, setNewMessage] = useState('')
  const [alertStatus, setAlertStatus] = useState(false)

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

    const message = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, message as any])
    setNewMessage('')

    // Simulate a response after a short delay
    setTimeout(() => {
      const response = {
        id: Math.random().toString(36),
        sender: 'recipient',
        content: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages((prev) => [...prev, response as any])
    }, 1000)
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
          <div className="border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={chatData.user.avatar} alt={chatData.user.name} />
                <AvatarFallback className="bg-gradient-to-br from-pink-400 to-violet-500 text-white">
                  {chatData.user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{chatData.user.name}</h2>
                <p className="text-xs text-gray-500">{chatData.user.specialization}</p>
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
              {messages.map((message) => (
                <div key={message.id}
                     className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-right text-xs ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {message.timestamp}
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
        </main>
      </div>
    </div>
  )
}
