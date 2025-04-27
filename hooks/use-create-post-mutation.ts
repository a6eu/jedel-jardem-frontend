import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postService } from '@/services/postService'
import { Post } from '@/types'

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['posts/createPost'],
    mutationFn: (data: Partial<Post>) => postService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts/getPosts']})
      alert("Posts created successfully.")
    }
  })
}