import { Dispatch } from "redux";
import firebase, { auth, firestore } from "../../../../../firebase/config";
import * as actionTypes from './actionTypes';
import { iLogin, iRegistration, UserDispatchType } from "../@types";

export const logInWithGoogle = () => async(dispatch: Dispatch<UserDispatchType>) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: "select_account"});
  try {
    const { user } = await auth.signInWithPopup(provider);
    if(user){
      dispatch({type: actionTypes.LOG_IN_WITH_GOOGLE, payload: {id: user.uid, displayName: user.displayName, email: user.email}})
    }
  } catch (error) {
    console.log(error)
  }
}

export const logInWithEmail = ({ email, password}: iLogin) => async (dispatch: Dispatch<UserDispatchType>) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    if(user){
      dispatch({type: actionTypes.LOG_IN_WITH_EMAIL, payload: { id: user.uid, displayName: user.displayName, email: user.email }})
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

export const registrationUser = ({ email, displayName, password}: iRegistration) => async(dispatch: Dispatch<UserDispatchType>) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email,password);
    const createdAt = new Date();
    if(user){
      const userRef = firestore.doc(`users/${user?.uid}`);
      await userRef.set({email,displayName,createdAt})
      const result = (await userRef.get()).data()
      dispatch({type: actionTypes.REGISTRATION_USER, payload: result})
    }
  } catch (error) {
    console.error(error)
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






