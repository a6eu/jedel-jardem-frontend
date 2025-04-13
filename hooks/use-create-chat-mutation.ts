import { useMutation } from '@tanstack/react-query'
import { chatService } from '@/services/chatService'

export const useCreateChatMutation = () => {
  return useMutation({
    mutationFn: (id: string) => chatService.createChat(id),
    mutationKey: ['chat/createChat']
  })
}