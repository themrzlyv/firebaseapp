import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Global/store';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Authentication, AuthProvider } from './services/context/Authentication';
import { checkCurrentUser } from './views/ui/Authentication/common/redux/Auth.Slice';

const { isAuthorized } = Authentication();

if (isAuthorized()) {
  store.dispatch(checkCurrentUser());
}

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root'),
);
