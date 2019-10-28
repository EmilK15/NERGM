import React from 'react';
import { Logout } from './';

const Home = () => {
    return (
        <div className="dashboard-container">
            <div className="home-container">
                Welcome to the home dashboard
                <Logout />
            </div>
        </div>
    )
};

export default Home;