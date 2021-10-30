import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthSlice from "../views/ui/Authentication/common/redux/Auth.Slice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};

const rootReducer = combineReducers({
    auth: AuthSlice
});


export default persistReducer(persistConfig,rootReducer)