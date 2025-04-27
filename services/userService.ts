import { api } from '@/http'
import type { User } from '@/types'

class UserService {
  async getUser(): Promise<User> {
    const response = await api.get<User>('/users')
    return response.data
  }

  async getUserById(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
  }

  async updateUser(data: Partial<User>) {
    return api.put<User>('/users', data)
  }

  async getAllUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users/everyone')
    return response.data
  }
}

export const userService = new UserService()