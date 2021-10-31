import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './views/components/Layout/Layout';
import Authentication from './views/ui/Authentication';
import mainRoutes from './views/ui/routes';
import PrivateRoute from './views/components/PrivateRoute/PrivateRoute';
import Profile from './views/ui/Profile';

const App: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path={mainRoutes.Authentication.main} component={Authentication} />
        <PrivateRoute path={mainRoutes.Profile.main} Component={Profile} />
      </Switch>
    </Layout>
  );
};

export default App;
