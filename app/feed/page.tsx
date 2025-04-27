'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MainNav } from '@/components/main-nav'
import { formatDate } from '@/utils'
import { useGetUser } from '@/hooks/use-get-user'
import { useCreateChatMutation } from '@/hooks/use-create-chat-mutation'
import { Textarea } from '@/components/ui/textarea'
import { useGetPosts } from '@/hooks/use-get-posts'
import { useCreatePostMutation } from '@/hooks/use-create-post-mutation'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SlidersHorizontal } from 'lucide-react'

export default function FeedPage() {
  const { user } = useGetUser()

  const [newPostContent, setNewPostContent] = useState({
    title: '',
    description: '',
    category: ''
  })
  const { mutate: createChat } = useCreateChatMutation()
  const { posts } = useGetPosts()
  const { mutate: createPost, isPending: isPosting } = useCreatePostMutation()
  const router = useRouter()
  const [chatButtonClicked] = useState('')
  const [category, setCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [authorName, setAuthorName] = useState('')

  const handleChatClick = async (id: string) => {
    if (user) {
      try {
        const chatId = await createChat(id, user._id);

        router.push(`/chat?id=${chatId}`);
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    }
  }

  const handleCreatePost = () => {
    if (!newPostContent.description.trim() && !newPostContent.title.trim()) return


    createPost(newPostContent)
  }

  const filteredPosts = posts?.filter((post) => {
    const matchesCategory = category ? post.category?.toLowerCase() === category.toLowerCase() : true;
    const matchesAuthor = authorName ? post.author?.name?.toLowerCase() === authorName.toLowerCase() : true;
    const matchesSearch = searchTerm
      ? post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesSearch && matchesAuthor;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-3">

          <div className="md:col-span-2 space-y-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search posts"
                className="flex-1"
                onChange={(e) => {
                  setSearchTerm(e.target.value as string)
                }}
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline"><SlidersHorizontal /></Button>
                </DialogTrigger>

                <DialogContent
                  aria-labelledby="filter-dialog-title"
                  aria-describedby="filter-dialog-description"
                >
                  <DialogHeader>
                    <DialogTitle id="filter-dialog-title">Filter Posts</DialogTitle>
                  </DialogHeader>

                  <div id="filter-dialog-description" className="space-y-4">
                    <Input placeholder="Author name.." value={authorName} onChange={(e) => {
                      setAuthorName(e.target.value as string)
                    }} />
                    <div className="grid gap-2">
                      <Label htmlFor="specialization">Category</Label>
                      <Select
                        onValueChange={(value) => setCategory(value)}
                        value={category}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="oncology">Oncology</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                          <SelectItem value="psychiatry">Psychiatry</SelectItem>
                          <SelectItem value="general">General Practice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>


                </DialogContent>
              </Dialog>
            </div>
            <Card className="p-0 gap-3">
              <CardHeader className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-[#1E7F6E] text-white">
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">Share with the community</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex flex-col gap-4">
                <Input value={newPostContent.title}
                       onChange={(e) => setNewPostContent({ ...newPostContent, title: e.target.value })}
                       placeholder="Title of post" />
                <Select
                  onValueChange={(value) => setNewPostContent({ ...newPostContent, category: value })}
                  value={newPostContent.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="general">General Practice</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="What's on your mind? Share your medical insights, questions, or updates..."
                  className="min-h-[100px] resize-none"
                  value={newPostContent.description}
                  onChange={(e) =>
                    setNewPostContent({
                      ...newPostContent,
                      description: e.target.value
                    })
                  }
                />
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end">
                <Button
                  className="bg-[#1E7F6E]"
                  onClick={handleCreatePost}
                  disabled={isPosting}
                >
                  {isPosting ? 'Posting...' : 'Post Update'}
                </Button>
              </CardFooter>
            </Card>
            {filteredPosts?.length === 0 && (
              <p className="text-center text-gray-500">No posts found. Try a different search or filter!</p>
            )}
            {filteredPosts?.map((post) => (
              <Card key={post._id} className="overflow-hidden gap-3 p-0">
                <CardHeader className="p-4">
                  <div onClick={() => router.push('/user/' + post.author._id)} className="flex items-start gap-4 cursor-pointer">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback
                        className="bg-[#1E7F6E] text-white">
                        {post.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                        }
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center">
                        <span className="font-semibold">{post.author.name}</span>
                        <Badge className="ml-2 bg-teal-100 text-teal-950 hover:bg-pink-100">
                          {post.author.role}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                    </div>
                  </div>
                  <p className="m-0 ml-12 px-2 text-white bg-gray-500 text-sm w-fit rounded-full pt-0 mt-0">#{post.category.toLowerCase()}</p>

                </CardHeader>
                <p className="m-0 px-4 font-bold pt-0 mt-0">{post.title}</p>
                <CardContent className="px-4 pt-0">
                  <p className="text-sm">{post.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-[#1E7F6E]"
                      onClick={() => {
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                      <span>0</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>0</span>
                    </Button>
                  </div>
                  <Button onClick={() => handleChatClick(post.author._id)}
                          className="bg-[#1E7F6E]">
                    {chatButtonClicked !== post.author._id
                      ? 'Chat with ' + post.author.name.split(' ')[0]
                      : 'Click one more time'
                    }
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="hidden md:block">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Your Profile</h3>
              </CardHeader>
              {user ? <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2">
                    <AvatarFallback
                      className="bg-[#1E7F6E] text-white">
                      {user.name?.split(' ').map((name: string) => name[0])}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </CardContent> : null}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
