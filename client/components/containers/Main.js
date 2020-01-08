import React from 'react';
import { Landingpage } from './';
import { Switch, Route } from 'react-router';
import { Dashboard } from '../presentation/dashboard';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Landingpage} />
            <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
    );
};

export default Main;