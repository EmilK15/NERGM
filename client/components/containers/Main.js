import React from 'react';
import { Landingpage, Secondpage } from './';
import { BrowserRouter as Router, Switch, Route } from 'react-router';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Landingpage} />
            <Route exact path='/second' component={Secondpage} />
        </Switch>
    );
};

export default Main;