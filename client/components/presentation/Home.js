import React from 'react';
import { Logout } from '../presentation';

const Home = () => {
    return (
        <div className="home-container">
            Welcome to the home dashboard
            <Logout />
        </div>
    )
};

export default Home;