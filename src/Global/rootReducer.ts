import { combineReducers } from "redux";
import authReducer from '../views/ui/Authentication/common/redux/reducer';


const rootReducer = combineReducers({
  appTools: combineReducers({
    auth: authReducer
  })
});


export default rootReducer;