import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services/chatService'

export const useGetChatById = (id: string) => {
  const { data, isPending } = useQuery({
    initialData: undefined,
    queryKey: ['chat/getById'],
    queryFn: () => chatService.getChatById(id)
  })

  return {
    chat: data,
    isPending
  }
}