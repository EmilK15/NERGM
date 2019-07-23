import React from 'react';
import { Link } from 'react-router-dom';

const Secondpage = () => {
    return (
        <div>
            Second page
            <button><Link to="/">Back!</Link></button>
        </div>
    );
};

export default Secondpage;