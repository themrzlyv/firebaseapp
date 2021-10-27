import { iStateReducer, UserDispatchType } from "../@types";
import * as actionTypes from './actionTypes';

const initialState: iStateReducer = {
  currentUser: null
}


const authReducer = (state: iStateReducer = initialState,action: UserDispatchType): iStateReducer => {
  switch (action.type) {
    
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
  
    default:
      return state;
  }
}

export default authReducer;