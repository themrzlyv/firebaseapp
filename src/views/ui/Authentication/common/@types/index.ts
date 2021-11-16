
export interface iLogin {
  email: string;
  password: string;
}

export interface iRegistration extends iLogin {
  fullname: string;
  photo: string;
  birthday: string;
  country: string;
  education: string;
  job: string;
  interests: any[];
  verified: boolean;
  isAdmin: boolean;
  likedPosts: any[];
  comments: any[];
}

export interface iStateReducer {
  currentUser: any | null;
  isLoading: boolean;
  error: string | null | unknown;
}