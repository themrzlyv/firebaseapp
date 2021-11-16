import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Authentication, AuthProvider } from './services/context/Authentication';
import { store, persistor } from './Global/store';
import { checkCurrentUser } from '@src/views/ui/Authentication/common/redux/Auth.Slice';

import App from './App';

import { ThemeProvider } from '@mui/material';
import { theme } from './Theme/theme';

const queryClient = new QueryClient();

const { isAuthorized } = Authentication();

if (isAuthorized()) {
  store.dispatch(checkCurrentUser());
}

ReactDOM.render(
  <AuthProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <App />
              <ToastContainer
                theme="colored"
                position="bottom-right"
                autoClose={2000}
                transition={Slide}
                hideProgressBar
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
              />
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </AuthProvider>,
  document.getElementById('root'),
);
