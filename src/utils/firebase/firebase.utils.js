import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, 
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
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  // return out of the function if not given userAuth
  if (!userAuth) return;

  // first, check if there is an existing document reference
    // we are using the uid from the user authentication as the unique identifier in the db collection
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

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
        createdAt, 
        ...additionalInfo,
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  // return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // if we are not given an email or a password, then exit the function
  if (!email || !password) return;

  // otherwise, return the value from calling the method
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth);