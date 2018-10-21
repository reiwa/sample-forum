import { firestore, initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

initializeApp({
  apiKey: "AIzaSyDsvwPPduaPVi0chvM-a2gihGXF7KwWyXA",
  authDomain: "qgwntugx8ctg.firebaseapp.com",
  databaseURL: "https://qgwntugx8ctg.firebaseio.com",
  projectId: "qgwntugx8ctg",
  storageBucket: "qgwntugx8ctg.appspot.com",
  messagingSenderId: "48865995893"
})

firestore().settings({ timestampsInSnapshots: true })

firestore()
  .enablePersistence({ experimentalTabSynchronization: true })
  .catch(err => {
    console.error(err)
  })
