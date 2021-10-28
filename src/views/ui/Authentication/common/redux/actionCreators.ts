import { Dispatch } from "redux";
import firebase, { auth, firestore } from "../../../../../firebase/config";
import * as actionTypes from './actionTypes';
import { iLogin, iRegistration, UserDispatchType } from "../@types";

export const registrationUser = ({ email, displayName, password}: iRegistration) => async(dispatch: Dispatch<UserDispatchType>) => {
  try {
    firestore.collection("users").where("email","==",email).get()
      .then( async snap => {
        if(snap.docs.length){
          return console.error('This email is already registered!')
        }
        
        const { user } = await auth.createUserWithEmailAndPassword(email,password)
        const createdAt = new Date();
        if(user){
          const userRef = firestore.doc(`users/${user.uid}`)
          await userRef.set({email,displayName,createdAt})
          const result = (await userRef.get()).data()
          dispatch({type: actionTypes.REGISTRATION_USER, payload: result})
        }
      })
      .catch(err => console.log(err))
  } catch (error) {
    console.error(error.message)
  }
}

export const logInWithGoogle = () => async(dispatch: Dispatch<UserDispatchType>) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: "select_account"});
  try {
    const { user } = await auth.signInWithPopup(provider);
    const createdAt = new Date();
    if(user){
      const userRef = firestore.doc(`users/${user?.uid}`);
      const snap = await userRef.get();
      snap.exists === false && await userRef.set({email: user.email,displayName: user.displayName,createdAt});
      const result = (await userRef.get()).data()
      dispatch({type: actionTypes.LOG_IN_WITH_GOOGLE, payload: result})
    }
  } catch (error) {
    console.log(error)
  }
}

export const logInWithEmail = ({ email, password}: iLogin) => async (dispatch: Dispatch<UserDispatchType>) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    if(user){
      const userRef = firestore.doc(`users/${user.uid}`);
      await userRef.get()
        .then( async snap => {
          if(snap.exists) {
            dispatch({type: actionTypes.LOG_IN_WITH_EMAIL, payload: snap.data()})
          } else {
            return await auth.currentUser?.delete()
          }
        } )
        .catch(err => console.log(err))
    }
  } catch (error) {
    console.log(error)
  }
}

export const logOutUser = () => async(dispatch: Dispatch<UserDispatchType>) => {
  try {
    await auth.signOut()
    dispatch({type: actionTypes.LOG_OUT, payload: null})
  } catch (error) {
    console.log(error)
  }
}


export const checkCurrentUser = () => async(dispatch: Dispatch<UserDispatchType>) => {
  auth.onAuthStateChanged(async userAuth => {
    try {
      dispatch({type: actionTypes.CHECK_CURRENT_USER, payload: userAuth})
    } catch (error) {
      console.log(error)
    }
  })
}






