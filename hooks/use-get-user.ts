import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/userService'

export const useGetUser = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getUser
  })

  return {
    isError,
    loading: isPending,
    user: data
  }
}