import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// allows us to connect to firebase and make crud actions for our application
const firebaseConfig = {
  apiKey: "AIzaSyDtU3j0DiWWAyCWhc2iqk1AyenNa7D9f3c",
  authDomain: "crwn-db-73645.firebaseapp.com",
  projectId: "crwn-db-73645",
  storageBucket: "crwn-db-73645.appspot.com",
  messagingSenderId: "556994796212",
  appId: "1:556994796212:web:0c68d526b64e34299f95e1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

// every time someone interacts with the provider, we want them to select an account
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// that the data from the authentication and store it inside of firestore
export const createUserDocumentFromAuth = async (userAuth) => {
  // first, check if there is an existing document reference
    // we are using the uid from the user authentication as the unique identifier in the db collection
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log('userDocRef', userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log('userSnaphot', userSnapshot);
  console.log(userSnapshot.exists());

  // check if user data exists
  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    // create/set the document with the data from the userAuth in collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  // return userDocRef
  return userDocRef;
};