import { firestore } from 'firebase/app'
import {
  APPS,
  BOARDS,
  NAMESPACE,
  RESPONSES,
  THREADS
} from '../constants/collection'

export const createResponse = async input => {
  const now = firestore.Timestamp.now()

  const system = {
    createdAt: now,
    updatedAt: now
  }

  const relation = {
    boardId: input.boardId,
    threadId: input.threadId
  }

  const responseId = firestore()
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
    .doc(input.threadId)

  const threadResponseRef = firestore()
    .collection(APPS)
    .doc(NAMESPACE)
    .collection(THREADS)
    .doc(input.threadId)
    .collection(RESPONSES)
    .doc(responseId)

  const threadRef = firestore()
    .collection(APPS)
    .doc(NAMESPACE)
    .collection(THREADS)
    .doc(input.threadId)

  const responseRef = firestore()
    .collection(APPS)
    .doc(NAMESPACE)
    .collection(RESPONSES)
    .doc(responseId)

  const transaction = async t => {
    const boardSnapshot = await t.get(boardRef)

    const threadSnapshot = await t.get(threadRef)

    if (!boardSnapshot.exists) {
      throw new Error('board not found')
    }

    if (!threadSnapshot.exists) {
      throw new Error('thread not found')
    }

    const board = boardSnapshot.data()

    console.log('board.responseCount', board.responseCount)

    t.update(boardRef, {
      responseCount: board.responseCount + 1,
      updatedAt: now
    })

    const thread = threadSnapshot.data()

    t.update(boardThreadRef, {
      responseCount: thread.responseCount + 1,
      updatedAt: now
    })

    t.update(threadRef, {
      responseCount: thread.responseCount + 1,
      updatedAt: now
    })

    const response = {
      ...system,
      ...relation,
      displayName: input.displayName,
      text: input.text,
      index: thread.responseCount
    }

    t.set(responseRef, response)

    t.set(threadResponseRef, response)
  }

  await firestore().runTransaction(transaction)
}
