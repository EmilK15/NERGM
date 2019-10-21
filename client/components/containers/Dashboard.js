import React, { Component } from 'react';
import { Loading } from '../presentation';
import { Query } from 'react-apollo';
import { GET_ME } from '../graphql/queries';
import { Redirect } from 'react-router-dom';
import { Home } from '../presentation';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="dashboard-container">
                <Query query={GET_ME}>
                    {({loading, error, data}) => {
                        const me = data;
                        if(loading)
                            return <Loading />;
                        if(error)
                            return <Redirect to="/" />;
                        return <Home />;
                    }}
                </Query>
            </div>
        )
    }
};

export default Dashboard;