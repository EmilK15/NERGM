import React, { Component } from 'react';
import { Home } from './';
import { Loading } from './responses';
import { Query } from 'react-apollo';
import { GET_ME } from '../graphql/queries';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { get_user, user_error } from '../../redux/actions/userActions';
import { Topbar } from './topbar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownSelect: '',
        }
    }

    dropDownRenderSwitch(navigation) {
        switch(navigation) {
            case 'Home':
                return <Home />;
            case 'Analytics':
                return <div>Analytics</div>;
            case 'My Account':
                return <div>My Account</div>;
            default:
                return <Home />;
        }
    }

    render() {
        const { topbar_navigation } = this.props;
        return (
            <Query query={GET_ME}>
                {({loading,error,data}) => {
                    if(loading)
                        return <Loading />;
                    if(error){
                        this.props.user_error(true);
                        return <Redirect to="/" />;
                    }
                    if(data) {
                        this.props.get_user(data.getMe);
                        return <div className="dashboard-container">
                            <Topbar />
                            { this.dropDownRenderSwitch(topbar_navigation) }
                        </div>                        
                    }
                }}
            </Query>
        )
    }
};

const mapStateToProps = state => ({
    topbar_navigation: state.navigation.topbar_navigation
});

const dispatchToProps = dispatch => {
    return {
        user_error: (bool) => dispatch(user_error(bool)),
        get_user: (user) => dispatch(get_user(user))
    }
};

export default connect (
    mapStateToProps,
    dispatchToProps,
)(Dashboard);