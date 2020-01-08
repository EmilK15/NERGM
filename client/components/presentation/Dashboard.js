import React from 'react';
import { Home } from './';
import { Loading } from './responses';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../graphql/queries';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_user, user_error } from '../../redux/actions/userActions';
import { Topbar } from './topbar';

const dropDownRenderSwitch = navigation => {
    switch(navigation) {
        case 'Home':
            return <Home />;
        case 'Analytics':
            return <div>Analytics</div>;
        case 'My Account':
            return <div>My Account</div>;
        default:
            return <Home />;
    }
}

const Dashboard = () => {
    const topbar_navigation = useSelector(state => state.navigation.topbar_navigation);
    const { loading, error, data } = useQuery(GET_ME);
    const dispatch = useDispatch();

    if(loading)
        return <Loading />;
    if(error) {
        dispatch(user_error(true));
        return <Redirect to="/"/>;
    }
    if(data) {
        dispatch(get_user(data.getMe));
        return <div className="dashboard-container">
            <Topbar />
            { dropDownRenderSwitch(topbar_navigation) }
        </div>   
    }
};

export default Dashboard;