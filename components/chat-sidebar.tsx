'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronLeft, Search } from 'lucide-react'
import { useGetChats } from '@/hooks/use-get-chats'
import { formatDate } from '@/utils'

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const { chats } = useGetChats()

  if (!chats) {
    return null
  }

  const filteredChats = chats.filter(
    (chat) => chat.recipient?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={`border-r bg-gray-50 transition-all duration-300 ${isOpen ? 'w-80' : 'w-0'}`}>
      {isOpen && (
        <div className="flex h-full flex-col">
          <div className="border-b p-4 flex items-center justify-between">
            <h2 className="font-semibold">Messages</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="md:hidden">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {filteredChats.map((chat) => (
                <Link
                  key={chat._id}
                  href={`/chat?id=${chat._id}`}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={chat.recipient.avatar} alt={chat.recipient.name} />
                      <AvatarFallback
                        className="bg-[#1E7F6E] text-white">
                        {chat.recipient.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{chat.recipient.name}</p>
                      <p className="text-xs text-gray-500">{formatDate(chat.updatedAt)}</p>
                    </div>
                    <p className="truncate text-sm text-gray-500">{chat.lastMessage}</p>
                  </div>
                  {/*{chat.unread && <div className="h-2 w-2 rounded-full bg-pink-500" />}*/}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      {!isOpen && (
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="m-2">
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      )}
    </div>
  )
}