import { initializeApp } from "firebase/app"
import { collection, getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC3QO1tvYwbaPCPdvt_eYPYH-nUIqEi_S8",
  authDomain: "ubnews-f3bbc.firebaseapp.com",
  projectId: "ubnews-f3bbc",
  storageBucket: "ubnews-f3bbc.appspot.com",
  messagingSenderId: "266950397935",
  appId: "1:266950397935:web:ab60291c24da26a23b301a",
  measurementId: "G-NFJEL91108"
}

// initialize app 
initializeApp(firebaseConfig)

// setup services
export const db = getFirestore()
export const auth = getAuth()

// setup collections

export const postsRef = collection(db, "posts")
export const categoriesRef = collection(db, "categories")
export const usersRef = collection(db, "users")
export const menusRef = collection(db, "menus")
