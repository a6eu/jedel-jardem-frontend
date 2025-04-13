import type { Message } from '@/types'
import { api } from '@/http'

class MessageService {
  async sendMessage(chatId: string, text: string) {
    return api.post('/messages', { chatId, text })
  }

  async getMessages(chatId: string): Promise<Message[]> {
    const response = await api.get<Message[]>('/messages/' + chatId)
    return response.data
  }
}

export const messageService = new MessageService()