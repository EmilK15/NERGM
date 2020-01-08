import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../graphql/mutations';
import { Loading } from './responses';
import { useDispatch } from 'react-redux';
import { reset_user } from '../../redux/actions/userActions';

const Logout = () => {
    const [logout, {client, loading}] = useMutation(LOGOUT);
    const dispatch = useDispatch();

    if(loading)
        return <Loading />;
    return (
        <Link className="logout-link" to="/"
            onClick={(e) => {
                dispatch(reset_user());
                logout();
                client.resetStore();
            }}>
            Logout
        </Link>
    )
};

export default Logout;