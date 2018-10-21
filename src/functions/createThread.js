import { firestore } from 'firebase/app'
import {
  APPS,
  BOARDS,
  NAMESPACE,
  RESPONSES,
  THREADS
} from '../constants/collection'

export const createThread = async input => {
  const now = firestore.Timestamp.now()

  const system = {
    createdAt: now,
    updatedAt: now
  }

  const relation = {
    boardId: input.boardId
  }

  const thread = {
    ...system,
    ...relation,
    title: input.title,
    description: input.description,
    displayName: input.displayName,
    responseCount: 1
  }

  const threadId = firestore()
    .collection(APPS)
    .doc().id

  const boardRef = firestore()
    .collection(APPS)
    .doc(NAMESPACE)
    .collection(BOARDS)
    .doc(input.boardId)

  const boardThreadRef = firestore()
    .collection(APPS)
    .doc(NAMESPACE)
    .collection(BOARDS)
    .doc(input.boardId)
    .collection(THREADS)
    .doc(threadId)

  const threadRef = firestore()
    .collection(APPS)
    .doc(NAMESPACE)
    .collection(THREADS)
    .doc(threadId)

  const response = {
    ...system,
    boardId: input.boardId,
    threadId: threadId,
    displayName: input.displayName,
    text: input.description,
    index: 0
  }

  const responseId = firestore()
    .collection(APPS)
    .doc().id

  const threadResponseRef = firestore()
    .collection(APPS)
    .doc(NAMESPACE)
    .collection(THREADS)
    .doc(threadId)
    .collection(RESPONSES)
    .doc(responseId)

  const responseRef = firestore()
    .collection(APPS)
    .doc(NAMESPACE)
    .collection(RESPONSES)
    .doc(responseId)

  const transaction = async t => {
    const boardSnapshot = await t.get(boardRef)

    if (!boardSnapshot.exists) {
      throw new Error('board not found')
    }

    const board = boardSnapshot.data()

    t.update(boardRef, {
      threadCount: board.threadCount + 1,
      responseCount: board.responseCount + 1,
      updatedAt: now
    })
  }

  await Promise.all([
    threadRef.set(thread),
    boardThreadRef.set(thread),
    threadResponseRef.set(response),
    responseRef.set(response),
    firestore().runTransaction(transaction)
  ])
}
