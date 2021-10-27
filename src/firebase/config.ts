import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
  apiKey: "AIzaSyAPClbIIurScmtNWhhv077bIB_VL0GMMdc",
  authDomain: "testdb-65d57.firebaseapp.com",
  projectId: "testdb-65d57",
  storageBucket: "testdb-65d57.appspot.com",
  messagingSenderId: "94083680534",
  appId: "1:94083680534:web:cd6b83a4fa64bf373aa837"
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
