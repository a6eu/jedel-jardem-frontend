import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetChatById } from '@/hooks/use-get-chat-by-id'
import { Message } from '@/types'
import { storeMessageInFirestore } from '@/services/firestoreService'
import { MainNav } from '@/components/main-nav'
import { ChatSidebar } from '@/components/chat-sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { format, isSameDay } from 'date-fns';

const formatDate = (timestamp: any): string => {
  const date = timestamp.toDate()
  return format(date, 'hh:mm a')
}

export default function ChatPageContent() {
  const [newMessage, setNewMessage] = useState('')
  const [alertStatus, setAlertStatus] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const params = useSearchParams()
  const { chat } = useGetChatById(params.get('id') as string)
  const [messages, setMessages] = useState<Partial<Message[]>>([])
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() && !file) return

    let messageText = newMessage

    if (file) {
      messageText = await convertFileToBase64(file)
    }

    if (chat && chat.recipient?._id) {
      await storeMessageInFirestore(params.get('id') as string, chat.recipient._id, messageText, !!file)
    }

    setNewMessage('')
    setFile(null)
  }

  const formatDateForGrouping = (timestamp: any): string => {
    const date = timestamp.toDate();
    return format(date, 'MMMM dd, yyyy');
  };

  if (!chat) {
    return null
  }

  const groupedMessages = chat.messages?.reduce((acc, message) => {
    if (message.createdAt) {
      const date = formatDateForGrouping(message.createdAt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
    }
    return acc;
  }, {} as { [key: string]: Partial<Message>[] });

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
    })
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
                  <AvatarFallback className="bg-[#1E7F6E] text-white">
                    {chat.recipient.name
                      .split(' ')
                      .map((n: any[]) => n[0])
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
                    of an urgent
                    matter.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {Object.entries(groupedMessages).map(([date, messagesForDate]) => (
                  <div key={date}>
                    <div className="text-center text-gray-500 py-2">{date}</div>
                    {messagesForDate.map((message) => (
                      <div
                        key={message._id}
                        className={`flex my-2 ${
                          message.userId !== chat?.recipient?._id ? 'justify-start' : 'justify-end'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.userId !== chat?.recipient?._id
                              ? 'bg-gray-100'
                              : 'bg-[#1E7F6E] text-white'
                          }`}
                        >
                          {message.isFile ? (
                            <a
                              href={message.text}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              View File
                            </a>
                          ) : (
                            <p>{message.text}</p>
                          )}
                          <p
                            className={`text-right text-xs ${
                              message.userId !== chat?.recipient?._id ? 'text-gray-500' : 'text-white/70'
                            }`}
                          >
                            {message.createdAt ? formatDate(message.createdAt) : ''}
                          </p>
                        </div>
                      </div>
                    ))}
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
              <input
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
              <Button type="submit" className="bg-[#1E7F6E]">
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
