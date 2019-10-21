import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    onChangeHandler(e, key) {
        this.setState({
            [key]: e.target.value
        });
    }


    onSubmitLogin(e, signIn) {
        e.preventDefault();
    }

    render() {
        return(
            <div className="main-container">
                Hello
            </div>
        );
    }
}

export default Landingpage;