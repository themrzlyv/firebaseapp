import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';

const middleware = [thunk];

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(...middleware))
)


export type RootState = ReturnType<typeof rootReducer>

export const persistor = persistStore(store);

export { store, persistStore };