import { useQuery } from '@tanstack/react-query'
import { postService } from '@/services/postService'

export const useGetPosts = () => {
  const { data } = useQuery({
    queryKey: ['posts/getPosts'],
    queryFn: postService.getPosts
  })

  return { posts: data }
}