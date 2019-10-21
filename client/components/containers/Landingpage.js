import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <div className="main-container">
                <h1>Intro to Node React Express GraphQL and MongoDB</h1>
                <button><Link to="/second">To other page!</Link></button>
            </div>
        );
    }
}

export default Landingpage;