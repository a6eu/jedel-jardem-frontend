"use client"

import {useState} from "react"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {MainNav} from "@/components/main-nav"

// Sample data for posts
const initialPosts = [
    {
        id: 1,
        author: {
            name: "Dr. Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            specialization: "Cardiology",
        },
        content:
            "Just published a new paper on advances in cardiac imaging techniques. Happy to share insights with colleagues interested in this field.",
        timestamp: "2 hours ago",
        likes: 24,
        comments: 5,
    },
    {
        id: 2,
        author: {
            name: "Dr. Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            specialization: "Neurology",
        },
        content:
            "Looking for collaborators on a research project focused on early detection of neurodegenerative diseases. Please reach out if interested!",
        timestamp: "5 hours ago",
        likes: 18,
        comments: 7,
    },
    {
        id: 3,
        author: {
            name: "Dr. Emily Rodriguez",
            avatar: "/placeholder.svg?height=40&width=40",
            specialization: "Pediatrics",
        },
        content:
            "Attended an amazing conference on childhood immunology yesterday. So many promising developments in the field!",
        timestamp: "1 day ago",
        likes: 42,
        comments: 12,
    },
]

export default function FeedPage() {
    const [posts, setPosts] = useState(initialPosts)

    const handleLike = (postId: number) => {
        setPosts((prevPosts) => prevPosts.map((post) => (post.id === postId ? {...post, likes: post.likes + 1} : post)))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <MainNav/>
            <main className="flex-1 container py-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-6">
                        {posts.map((post) => (
                            <Card key={post.id} className="overflow-hidden">
                                <CardHeader className="p-4">
                                    <div className="flex items-start gap-4">
                                        <Avatar>
                                            <AvatarImage src={post.author.avatar} alt={post.author.name}/>
                                            <AvatarFallback
                                                className="bg-gradient-to-br from-pink-400 to-violet-500 text-white">
                                                {post.author.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center">
                                                <span className="font-semibold">{post.author.name}</span>
                                                <Badge className="ml-2 bg-pink-100 text-pink-800 hover:bg-pink-100">
                                                    {post.author.specialization}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-gray-500">{post.timestamp}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p>{post.content}</p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center gap-1 text-pink-500"
                                            onClick={() => handleLike(post.id)}
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
                                            <span>{post.likes}</span>
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
                                            <span>{post.comments}</span>
                                        </Button>
                                    </div>
                                    <Link href={`/chat/${post.id}`}>
                                        <Button className="bg-gradient-to-r from-pink-500 to-violet-500">
                                            Chat with {post.author.name.split(" ")[0]}
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="hidden md:block">
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-semibold">Your Profile</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16 border-2 border-pink-200">
                                        <AvatarFallback
                                            className="bg-gradient-to-br from-pink-400 to-violet-500 text-white">
                                            YN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">Your Name</p>
                                        <p className="text-sm text-gray-500">General Practice</p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <Link href="/profile">
                                        <Button variant="outline" className="w-full">
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="mt-6">
                            <CardHeader>
                                <h3 className="text-lg font-semibold">Suggested Connections</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    {
                                        name: "Dr. Alex Thompson",
                                        specialization: "Oncology",
                                    },
                                    {
                                        name: "Dr. Lisa Wang",
                                        specialization: "Dermatology",
                                    },
                                    {
                                        name: "Dr. James Wilson",
                                        specialization: "Psychiatry",
                                    },
                                ].map((doctor, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback
                                                    className="bg-gradient-to-br from-pink-400 to-violet-500 text-white text-xs">
                                                    {doctor.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{doctor.name}</p>
                                                <p className="text-xs text-gray-500">{doctor.specialization}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-pink-500">
                                            Connect
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
