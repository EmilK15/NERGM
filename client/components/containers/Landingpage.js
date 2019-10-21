import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SIGN_IN} from '../graphql/mutations';
import { Mutation } from 'react-apollo';
import { Form, Button } from 'react-bootstrap';
import { Errormsg, Loading } from '../presentation';

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
        if(this.state.email && this.state.password) {
            signIn({
                variables: {
                    email: this.state.email,
                    password: this.state.password
                }});
            this.setState({
                email: '',
                password: '',
                error: ''
            });
        } else {
            this.setState({
                error: 'Please input email and password'
            });
        }
    }

    render() {
        return(
            <div className="main-container">
                <Mutation mutation={SIGN_IN} variables={{email: this.state.email, password: this.state.password}}>
                {(signIn, { data, loading, error}) => {
                    const errormsg = error ? <Errormsg message={error.message} /> : null;
                    const loadingmsg = loading ? <Loading /> : null;
                    const redirect = data ? <Redirect to="/dashboard" /> : null;
                    return (
                        <Form className="login-form" onSubmit={(e) => this.onSubmitLogin(e, signIn)}>
                            <Form.Label className="login-title">Login Page</Form.Label>
                            {errormsg}
                            {loadingmsg}
                            {redirect}
                            <Form.Group controlId="input-username">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control value={this.state.email} onChange={(e, key) => this.onChangeHandler(e, 'email')} type="email" placeholder="Email" required></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="input-pw">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={this.state.password} onChange={(e, key) => this.onChangeHandler(e, 'password')} type="password" placeholder="Password" min="8" max="20" required></Form.Control>
                            </Form.Group>
                            <Button className="login-btn" type="submit">Login</Button>
                        </Form>
                    )
                }}
                </Mutation>
            </div>
        );
    };
};

export default Landingpage;