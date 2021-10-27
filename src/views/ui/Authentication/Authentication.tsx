import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import mainRoutes from '../routes';

import Login from './pages/Login';
import Registration from './pages/Registration';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../services/selectors/authSelector';

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
        exact
        path={mainRoutes.Authentication.registration}
        render={() => (currentUser ? <Redirect to="/" /> : <Registration />)}
      />
    </Switch>
  );
};

export default Authentication;
