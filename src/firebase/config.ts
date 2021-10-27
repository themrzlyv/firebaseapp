import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { iCreateProfileProps } from './@types/firebase';


const config = {
  apiKey: "AIzaSyAPClbIIurScmtNWhhv077bIB_VL0GMMdc",
  authDomain: "testdb-65d57.firebaseapp.com",
  projectId: "testdb-65d57",
  storageBucket: "testdb-65d57.appspot.com",
  messagingSenderId: "94083680534",
  appId: "1:94083680534:web:cd6b83a4fa64bf373aa837"
}

export const createUserProfileDocument = async ({userAuth,additionalData}: iCreateProfileProps) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();


    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account"});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
