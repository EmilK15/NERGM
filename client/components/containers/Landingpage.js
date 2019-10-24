import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SIGN_IN} from '../graphql/mutations';
import { Mutation } from 'react-apollo';
import { Form, Button } from 'react-bootstrap';
import { Errormsg, Loading, Register, Success } from '../presentation';
import { connect } from 'react-redux';

class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onChangeHandler(e, key) {
        this.setState({
            [key]: e.target.value
        });
    }

    onSubmitLogin(e, signIn) {
        e.preventDefault();
        signIn({
            variables: {
                email: this.state.email,
                password: this.state.password
            }});
        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        const { userError, registerSuccess } = this.props;
        const sessionEnded = userError ? <Errormsg message="Please login to continue to dashboard." /> : null;
        const registrationSuccess = registerSuccess ? <Success message="Registration successful! Please login." /> : null;
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
                            {sessionEnded}
                            {registrationSuccess}
                            {errormsg}
                            {loadingmsg}
                            {redirect}
                            <Form.Group controlId="input-email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control value={this.state.email} onChange={(e, key) => this.onChangeHandler(e, 'email')} type="email" placeholder="Email" required></Form.Control>
                            </Form.Group>

                            <Form.Group controlId="input-pw">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={this.state.password} onChange={(e, key) => this.onChangeHandler(e, 'password')} type="password" placeholder="Password" min="8" max="20" required></Form.Control>
                            </Form.Group>
                            <Button className="login-btn" type="submit" disabled={this.state.email && this.state.password}>Login</Button>
                            <Register />
                        </Form>
                    )
                }}
                </Mutation>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    userError: state.user.userError,
    registerSuccess: state.user.registerSuccess
});

export default connect(
    mapStateToProps,
    null
)(Landingpage);