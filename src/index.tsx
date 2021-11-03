import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Global/store';
import App from './App';

import { Authentication, AuthProvider } from './services/context/Authentication';
import { checkCurrentUser } from './views/ui/Authentication/common/redux/Auth.Slice';
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme/theme';

const { isAuthorized } = Authentication();

if (isAuthorized()) {
  store.dispatch(checkCurrentUser());
}



ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root'),
);
