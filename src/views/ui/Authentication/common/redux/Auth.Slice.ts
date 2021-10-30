import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction
} from "@reduxjs/toolkit";
import { auth, firestore } from "../../../../../firebase/config";
import Storage from "../../../../../services/data/Storage";
import { iLogin, iRegistration, iStateReducer } from "../@types";
import firebase from './../../../../../firebase/config';

const initialState: iStateReducer = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const getCurrentUser = (): Promise<firebase.User | null> => {
  return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
          unsubscribe();
          resolve(userAuth);
      }, reject)
  });
}

export const checkCurrentUser = createAsyncThunk('Auth/checkCurrentUser', async(_,{rejectWithValue}) => {
  const { refToken } = Storage.getRefreshToken();
  const { accessToken } = Storage.getAccessToken();

  const user = await getCurrentUser();

  if(user){
    const { refreshToken } = user;
    const userAccessToken = await user.getIdToken();

    if(refToken){
      if(refToken !== refreshToken){
        Storage.clearRefreshToken();
        return rejectWithValue("invalid token")
      }
    }

    if(accessToken){
      if(accessToken !== userAccessToken){
        Storage.clearAccessToken();
        return rejectWithValue("invalid token")
      }
      Storage.setRefreshToken(refreshToken);
      Storage.clearAccessToken();
    }
    return {id: user?.uid, email: user?.email, displayName: user?.displayName}
  }
})

export const registrationUser = createAsyncThunk('Auth/registration', async ({ email, displayName, password}: iRegistration, {rejectWithValue}) => {
  const snap = await firestore.collection("users").where("email","==",email).get();
  if(snap.docs.length) {
    return rejectWithValue("This email is already registered!");
  } 

  const { user } = await auth.createUserWithEmailAndPassword(email,password);
  const createdAt = new Date();
  if(user){
    const userRef = firestore.doc(`users/${user?.uid}`)
    await userRef.set({email,displayName,createdAt})
    const accessToken = await user.getIdToken();
    Storage.setAccessToken(accessToken);
    const result = (await userRef.get()).data()
    return result
  }
});

export const logInWithGoogle = createAsyncThunk('Auth/logInWithGoogle', async (_,{rejectWithValue}) => {
  
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: "select_account"});
  try {
    const { user } = await auth.signInWithPopup(provider);
    const createdAt = new Date();
    if(user){
      const userRef = firestore.doc(`users/${user?.uid}`);
      const snap = await userRef.get();
      snap.exists === false && await userRef.set({email: user.email,displayName: user.displayName,createdAt});
      const accessToken = await user.getIdToken();
      Storage.setAccessToken(accessToken);
      const result = (await userRef.get()).data()
      return result;
    }
  } catch (error) {
    return rejectWithValue(error)
  }
  
});


export const logInWithEmail = createAsyncThunk('Auth/logInWithEmail', async ({ email, password}: iLogin, {rejectWithValue}) => {
  
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    if(user){
      const userRef = firestore.doc(`users/${user.uid}`);
      const snap = await userRef.get();

      if(snap.exists) {
        const accessToken = await user.getIdToken();
        Storage.setAccessToken(accessToken);
        return snap.data();
      } else {
        Storage.clearAccessToken();
        await auth.currentUser?.delete()
      }
    }
  } catch (error) {
    return rejectWithValue(error);
  }
  
});

export const logOutUser = createAsyncThunk('Auth/logOutUser', async(_,{rejectWithValue}) => {
  try {
    Storage.clearAccessToken();
    Storage.clearRefreshToken();
    await auth.signOut()
    return null
  } catch (error) {
    return rejectWithValue(error);
  }
})


const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
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

    builder.addCase(logOutUser.pending, (state, { payload }) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(logOutUser.fulfilled, (state, action:PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    builder.addCase(logOutUser.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.currentUser = null;
    })
  }
});


// export const { logOut } = AuthSlice.actions;


export default AuthSlice.reducer;