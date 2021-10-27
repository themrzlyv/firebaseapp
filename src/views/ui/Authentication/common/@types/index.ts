import { SET_CURRENT_USER } from "../redux/actionTypes";

export interface iLogin {
  email: string;
  password: string;
}

export interface iRegistration extends iLogin {
  displayName: string;
}

export interface iStateReducer {
  currentUser: any | null
}

export interface SetCurrentUser {
  type: typeof SET_CURRENT_USER;
  payload: any;
}

export type UserDispatchType = SetCurrentUser