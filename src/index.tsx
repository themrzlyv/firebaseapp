import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './Global/store';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
