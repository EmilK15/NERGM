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
            <div className="mainContainer">
                <h1> Intro 1</h1>
                <button><Link to="/second">To other page!</Link></button>
            </div>
        );
    }
}

export default Landingpage;