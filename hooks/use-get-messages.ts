import { useQuery } from '@tanstack/react-query'
import { api } from '@/http'
import { Message } from '@/types'

export const useGetMessages = (chatId: string) => {
  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: async () => {
      const { data } = await api.get<Message[]>(`/messages/${chatId}`)
      return data
    }
  })
}
