import { useMutation } from '@tanstack/react-query'
import { postService } from '@/services/postService'
import { Post } from '@/types'

export const useCreatePostMutation = () => {
  return useMutation({
    mutationKey: ['posts/createPost'],
    mutationFn: (data: Partial<Post>) => postService.createPost(data)
  })
}