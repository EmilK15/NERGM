import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../graphql/mutations';
import { Loading } from './Loading';

const Logout = () => {
    const [logout, {client, loading}] = useMutation(LOGOUT);

    if(loading)
        return (<Loading />);
    return (
        <Link className="logout-link" to="/"
            onClick={(e) => {
                logout();
                client.resetStore();
            }}>
            Logout
        </Link>
    )
};

export default Logout;