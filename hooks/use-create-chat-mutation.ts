import { db } from '@/firebase';
import { collection, addDoc, query, where, getDocs, doc } from 'firebase/firestore'

export const useCreateChatMutation = () => {
  const createChat = async (recipientId: string, currentUser: string) => {
    const q = query(
      collection(db, 'chats'),
      where('members', 'array-contains-any', [currentUser, recipientId])
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const newChat = await addDoc(collection(db, 'chats'), {
        members: [currentUser, recipientId],
        me: currentUser,
        recipient: { _id: recipientId },
        lastMessage: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return newChat.id;
    } else {
      return querySnapshot.docs[0].id;
    }
  };

  return { mutate: createChat };
};
