import { api } from '@/http'
import { Post } from '@/types'

class PostService {
  async getPosts() {
    const response = await api.get<Post[]>('/posts')
    return response.data
  }

  async createPost(post: Partial<Post>) {
    return api.post('/posts', post)
  }
}

export const postService = new PostService()