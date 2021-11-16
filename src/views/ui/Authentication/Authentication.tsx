import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import mainRoutes from '@src/views/ui/routes';
import { authSelector } from '@src/services/selectors/authSelector';

import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';

interface iProps {}

const Authentication: React.FC<iProps> = (): JSX.Element => {
  const { currentUser } = useSelector(authSelector);

  return (
    <Switch>
      <Route
        exact
        path={mainRoutes.Authentication.login}
        render={() => (currentUser ? <Redirect to="/" /> : <Login />)}
      />
      <Route
        path={mainRoutes.Authentication.registration}
        render={() => (currentUser ? <Redirect to="/" /> : <Registration />)}
      />
      <Redirect to="/auth/login" />
    </Switch>
  );
};

export default Authentication;
