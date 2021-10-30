
export interface iLogin {
  email: string;
  password: string;
}

export interface iRegistration extends iLogin {
  displayName: string;
}

export interface iStateReducer {
  currentUser: any | null;
  isLoading: boolean;
  error: string | null | unknown;
}