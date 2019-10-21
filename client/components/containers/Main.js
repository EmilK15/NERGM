import React from 'react';
import { Landingpage, Dashboard } from './';
import { Switch, Route } from 'react-router';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Landingpage} />
            <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
    );
};

export default Main;