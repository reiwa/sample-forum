import { firestore } from 'firebase/app'
import { APPS, BOARDS, NAMESPACE } from '../constants/collection'

export const createBoard = async input => {
  const now = firestore.Timestamp.now()

  const system = {
    createdAt: now,
    updatedAt: now
  }

  const board = {
    ...system,
    title: input.title,
    description: input.description,
    threadCount: 0,
    responseCount: 0
  }

  const boardId = firestore()
    .collection(APPS)
    .doc().id

  const boardRef = firestore()
    .collection(APPS)
    .doc(NAMESPACE)
    .collection(BOARDS)
    .doc(boardId)

  await boardRef.set(board)
}
