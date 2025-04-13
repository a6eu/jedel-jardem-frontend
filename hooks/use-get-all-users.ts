import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/userService'

export const useGetAllUsers = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['users/all'],
    queryFn: userService.getAllUsers
  })

  return { users: data, isPending, error }
}