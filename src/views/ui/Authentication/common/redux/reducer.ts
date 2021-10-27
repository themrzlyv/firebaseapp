import { AnyAction } from "redux";

import * as actionTypes from './actionTypes';
import { iStateReducer } from "../@types";


const initialState: iStateReducer = {
  currentUser: null
}

const authReducer = (state: iStateReducer = initialState,action: AnyAction): iStateReducer => {
  switch (action.type) {

    case actionTypes.LOG_IN_WITH_GOOGLE:
      return {
        ...state,
        currentUser: action.payload
      }

    case actionTypes.LOG_IN_WITH_EMAIL:
      return {
        ...state,
        currentUser: action.payload
      }

    case actionTypes.REGISTRATION_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    case actionTypes.LOG_OUT:
      return {
        ...state,
        currentUser: action.payload
      }
    
    case actionTypes.CHECK_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state;
  }
}

export default authReducer;