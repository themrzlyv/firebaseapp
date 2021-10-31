
export interface iLogin {
  email: string;
  password: string;
}

export interface iRegistration extends iLogin {
  name: string;
}

export interface iStateReducer {
  currentUser: any | null;
  isLoading: boolean;
  error: string | null | unknown;
}