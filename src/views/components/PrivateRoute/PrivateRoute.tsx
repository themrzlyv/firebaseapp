import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../services/selectors/authSelector';

export interface iPrivateRoute {
  exact?: boolean;
  path?: string;
  component: React.FunctionComponent;
}

const PrivateRoute: React.FC<iPrivateRoute> = ({ exact, path, component }) => {
  const { currentUser } = useSelector(authSelector);

  if (currentUser) {
    return <Route exact={exact} path={path} component={component} />;
  }

  return <Redirect to="/auth/login" />;
};

export default PrivateRoute;
