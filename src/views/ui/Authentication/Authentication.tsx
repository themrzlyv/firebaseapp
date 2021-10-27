import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import mainRoutes from '../routes';


import Login from './pages/Login';
import Registration from './pages/Registration';

interface iProps {
}

const Authentication:React.FC<iProps> = (): JSX.Element => {

    return (
        <Switch>
            <Route exact path={mainRoutes.Authentication.login} component={Login} />
            <Route exact path={mainRoutes.Authentication.registration} component={Registration} />
            <Redirect to={mainRoutes.Authentication.login} />
        </Switch>
    );
}

export default Authentication;