'use client'

import { Suspense } from 'react'
import ChatPageContent from './chat-page-content'

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatPageContent />
    </Suspense>
  )
}
