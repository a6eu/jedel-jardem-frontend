'use client'

import { useEffect, useState } from 'react'
import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const useGetChats = (userId: string | undefined) => {
  const [chats, setChats] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const q = query(
          collection(db, 'chats'),
          where('members', 'array-contains', userId)
        )

        const querySnapshot = await getDocs(q)

        const chatsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))

        setChats(chatsData)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [userId])

  return {
    chats,
    loading,
    error
  }
}
