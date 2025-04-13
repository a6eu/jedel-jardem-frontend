import { useMutation } from '@tanstack/react-query'
import { messageService } from '@/services/messageService'

export const useSendMessageMutation = () => {
  return useMutation({
    mutationKey: ['messages/sendMessage'],
    mutationFn: ({ chatId, text }: { chatId: string; text: string }) =>
      messageService.sendMessage(chatId, text)
  })
}