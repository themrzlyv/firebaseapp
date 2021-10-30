import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../services/selectors/authSelector';
import { checkCurrentUser } from '../../ui/Authentication/common/redux/Auth.Slice';
import { useAuth } from '../../../services/context/Authentication';

export interface iPrivateRoute {
  exact?: boolean;
  path?: string;
  Component: React.FunctionComponent;
}

const PrivateRoute: React.FC<iPrivateRoute> = ({ exact, path, Component }) => {
  const { currentUser, isLoading } = useSelector(authSelector);
  return (
    <Route
      render={() =>
        isLoading ? <h4>loading</h4> : currentUser ? <Component /> : <Redirect to="auth/login" />
      }
    />
  );
};

export default PrivateRoute;
