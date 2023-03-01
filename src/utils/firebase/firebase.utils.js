import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

// every time someone interacts with the provider, we want them to select an account
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// adding collections and documents to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done');
};


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap;
}

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

export const signOutUser = async () => await signOut(auth);

// runs a callback everytime the auth state changes
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);