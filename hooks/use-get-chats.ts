import { chatService } from '@/services/chatService'
import { useQuery } from '@tanstack/react-query'

export const useGetChats = () => {
  const { data } = useQuery({
    queryKey: ['chat/getChats'],
    queryFn: chatService.getChats
  })

  return {
    chats: data
  }
}
