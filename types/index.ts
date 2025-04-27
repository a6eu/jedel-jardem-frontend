export interface Post {
  _id: string
  title: string
  description: string
  images: string[]
  category: string
  author: {
    _id: string
    name: string
    email: string
    avatar: string
    specialisation: string
    role: string
  }
  status: string
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: string
  name: string
  email: string
  avatar: string
  role: string
  gender: string
  patientData: {
    bloodType: string,
    weight: string,
    height: string,
    illnessHistory: string[],
    allergies: string[]
  },
  company: string
  bio: string
}

export interface Chat {
  _id: string
  members: User[]
  me: User
  lastMessage: string
  recipient: User
  createdAt: string
  updatedAt: string
}

export interface Message {
  userId: string
  _id: string
  chat: string
  sender: User,
  text: string
  createdAt: string
  updatedAt: string
  isMine: boolean
}