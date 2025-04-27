import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { userService } from '@/services/userService'
import { useGetUser } from '@/hooks/use-get-user'

export function useGetChatById(chatId: string) {
  const [chat, setChat] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useGetUser()

  useEffect(() => {
    const fetchChat = async () => {
      try {
        setLoading(true)
        const chatDocRef = doc(db, 'chats', chatId)
        const chatDocSnap = await getDoc(chatDocRef)

        if (chatDocSnap.exists()) {
          const chatData = chatDocSnap.data()
          const recipientId = chatData.members.find((id: string) => id !== user?._id)
          console.log(recipientId)

          const recipient = await userService.getUserById(recipientId)

          setChat({
            ...chatData,
            recipient: recipient
          })
        } else {
          setError('Chat not found')
        }
      } catch (err) {
        console.error(err)
        setError('Error fetching chat')
      } finally {
        setLoading(false)
      }
    }

    fetchChat()
  }, [chatId, user?._id])

  return { chat, loading, error }
}
