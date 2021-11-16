import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction
} from "@reduxjs/toolkit";
import bcrypt from 'bcryptjs';
import { auth, firestore } from "../../../../../firebase/config";
import { checkToken, createUser } from "../../../../../services/api/Api.requests";
import GenerateJwt from "../../../../../services/data/GenerateJwt";
import Storage from "../../../../../services/data/Storage";
import { iLogin, iRegistration, iStateReducer } from "../@types";
import firebase from './../../../../../firebase/config';

const initialState: iStateReducer = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const checkCurrentUser = createAsyncThunk('Auth/checkCurrentUser', async(_,{rejectWithValue}) => {
  const userId = await checkToken();
  if(userId){
    try {
      const data = await firestore.collection("users").where("id","==",userId).get();
      if(data.docs.length > 1) return rejectWithValue("Invalid token!");
      const user = createUser(data.docs[0]);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
})

export const registrationUser = createAsyncThunk('Auth/registration', async ({ email, fullname, password, birthday, country, education, interests, comments, job, photo, verified, isAdmin, likedPosts }: iRegistration, {rejectWithValue}) => {
  try {
    const snap = await firestore.collection("users").where("email","==",email).get();
    if(snap.docs.length) {
      return rejectWithValue("This email is already registered!");
    } 

    if(!email || !fullname || !password) return rejectWithValue("Please fill all inputs!");

    const hashedPassword = await bcrypt.hash(password,12);
    const createdAt = new Date();

    const data = await firestore.collection("users").add({email,fullname,password: hashedPassword, isAdmin, likedPosts, createdAt});
    await firestore.doc(`users/${data.id}`).update({id: data.id});
    const userDb = await data.get();
    const user = createUser(userDb);

    const { token } = GenerateJwt.accessToken({id: data.id})
    Storage.setAccessToken(token);
    return user;
  } catch (error) {
    return rejectWithValue(error)
  }  
});

export const logInWithGoogle = createAsyncThunk('Auth/logInWithGoogle', async (_,{rejectWithValue}) => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account"});
    const { user } = await auth.signInWithPopup(provider);
    const createdAt = new Date();
    if(user){
      const userRef = firestore.doc(`users/${user?.uid}`);
      const snap = await userRef.get();
      snap.exists === false && await userRef.set({id: user.uid, email: user.email,name: user.displayName,createdAt});
      const { token } = GenerateJwt.accessToken({id: user.uid})
      Storage.setAccessToken(token);
      const result = (await userRef.get()).data()
      return result;
    }
  } catch (error) {
    return rejectWithValue(error)
  }
});



export const logInWithEmail = createAsyncThunk('Auth/logInWithEmail', async ({ email, password}: iLogin, {rejectWithValue}) => {
  try {
    if(!email || !password) return rejectWithValue("Please fill all inputs");

    const snap = await firestore.collection("users").where("email","==",email).get();
    const userDb = snap.docs.find(el => el.data().email === email);
    if(!userDb) return rejectWithValue("Invalid email!");

    const isMatch:boolean = await bcrypt.compare(password,userDb.data().password);
    if(!isMatch) return rejectWithValue("Invalid password!");

    const user = createUser(userDb);

    const { token } = GenerateJwt.accessToken({id: user.id});
    Storage.setAccessToken(token);
    return user
  } catch (error) {
    return rejectWithValue(error);
  }
  
});


const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    logOutUser: (state) => {
      Storage.clearAccessToken();
      Storage.clearRefreshToken();
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkCurrentUser.pending, (state, { payload }) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(checkCurrentUser.fulfilled, (state, action:PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(checkCurrentUser.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.currentUser = null;
    })

    builder.addCase(registrationUser.pending, (state, { payload }) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(registrationUser.fulfilled, (state, action:PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(registrationUser.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.currentUser = null;
    })

    builder.addCase(logInWithGoogle.pending, (state, { payload }) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(logInWithGoogle.fulfilled, (state, action:PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(logInWithGoogle.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.currentUser = null;
    })

    builder.addCase(logInWithEmail.pending, (state, { payload }) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(logInWithEmail.fulfilled, (state, action:PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(logInWithEmail.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.currentUser = null;
    })
  }
});


export const { logOutUser } = AuthSlice.actions;


export default AuthSlice.reducer;