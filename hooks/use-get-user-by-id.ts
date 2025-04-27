import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/userService'

export const useGetUserById = (id: string) => {
  const {data, isPending} = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id),
  })

  return {
    user: data,
    isLoading: isPending,
  }
}