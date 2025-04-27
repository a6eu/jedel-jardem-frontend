import { db } from '@/firebase'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

async function storeMessageInFirestore(chatId: string, userId: string, messageText: string, isFile: boolean) {
  const chatRef = doc(db, 'chats', chatId)

  // Create the message object
  const message = {
    _id: Date.now().toString(),
    userId,
    text: messageText,
    createdAt: new Date(),
    isFile,
  }

  await updateDoc(chatRef, {
    messages: arrayUnion(message),
    lastMessage: messageText,
  })

  await updateDoc(chatRef, {
    lastMessage: messageText,
  })
}

export { storeMessageInFirestore }