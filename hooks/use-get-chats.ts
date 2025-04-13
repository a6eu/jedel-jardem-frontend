import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chatService'

export const useGetChats = () => {
  const { data } = useQuery({
    queryKey: ['chat/getChats'],
    queryFn: chatService.getChats
  })

  return {
    chats: data
  }
}