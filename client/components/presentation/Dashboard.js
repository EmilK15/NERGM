import React from 'react';
import { Loading, Home } from './';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../graphql/queries';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { get_user, user_error } from '../../redux/actions/userActions';

const Dashboard = () => {
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
        return <Home />
    }
};

export default Dashboard;