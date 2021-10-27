import { CHECK_CURRENT_USER, LOG_IN_WITH_EMAIL, LOG_IN_WITH_GOOGLE, LOG_OUT, REGISTRATION_USER } from "../redux/actionTypes";

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

export interface LogInWithEmail {
  type: typeof LOG_IN_WITH_EMAIL;
  payload: any;
}

export interface LogInUserWithGoogle {
  type: typeof LOG_IN_WITH_GOOGLE;
  payload: any;
}

export interface RegistrationUser {
  type: typeof REGISTRATION_USER;
  payload: any;
}

export interface CheckCurrentUser {
  type: typeof CHECK_CURRENT_USER;
  payload: any;
}

export interface LogOutUser {
  type: typeof LOG_OUT;
  payload: null;
}


export type UserDispatchType = LogInUserWithGoogle | LogInWithEmail | RegistrationUser | CheckCurrentUser | LogOutUser