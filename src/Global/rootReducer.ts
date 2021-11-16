import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AuthSlice from "../views/ui/Authentication/common/redux/Auth.Slice";
import PostSlice from "@src/views/ui/Post/common/redux/Post.Slice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};

const rootReducer = combineReducers({
    auth: AuthSlice,
    posts: PostSlice
});


export default persistReducer(persistConfig,rootReducer)