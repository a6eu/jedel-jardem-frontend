import { useQuery } from '@tanstack/react-query'
import { messageService } from '@/services/messageService'

export const useGetMessages = (chatId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['messages'],
    queryFn: () => messageService.getMessages(chatId)
  })

  return {
    messages: data,
    isPending
  }
}