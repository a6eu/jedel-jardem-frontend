import { useMutation } from '@tanstack/react-query'
import { userService } from '@/services/userService'
import type { User } from '@/types'

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationKey: ['user/update'],
    mutationFn: (data: Partial<User>) => userService.updateUser(data)
  })
}