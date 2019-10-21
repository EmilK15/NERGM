import React from 'react';
import { Landingpage, Secondpage } from './';
import { Switch, Route } from 'react-router';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Landingpage} />
            <Route exact path='/second' component={Secondpage} />
        </Switch>
    );
};

export default Main;