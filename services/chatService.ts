import type { Chat } from '@/types'
import { api } from '@/http'

class ChatService {
  async getChats(): Promise<Chat[]> {
    const response = await api.get('/chats')
    return response.data
  }

  async createChat(userId: string): Promise<Chat> {
    const response = await api.post('/chats', { userId })
    return response.data
  }

  async getChatById(id: string): Promise<Chat> {
    const response = await api.get(`/chats/${id}`)
    return response.data
  }
}

export const chatService = new ChatService()