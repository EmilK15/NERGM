import { gql } from 'apollo-boost';

export const LOGIN = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation registerUser($user: userInput) {
        registerUser(user: $user) {
            _id
            email
            role
            lName
            fName
        }
    }
`;

export const LOGOUT = gql`
    mutation logout() {
        logout
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($user: userEdit) {
        updateUser(user: $user) {
            _id
            email
            role
            fName
            lName
        }
    }
`;