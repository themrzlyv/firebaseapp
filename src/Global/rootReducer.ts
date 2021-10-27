import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../views/ui/Authentication/common/redux/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
    auth: authReducer
});


export default persistReducer(persistConfig,rootReducer)