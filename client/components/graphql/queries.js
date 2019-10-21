import { gql } from 'apollo-boost';

export const GET_ME = gql`
    getMe {
        _id
        role
        fName
        lName
        email
    }
`;

export const GET_USERS_OF_TYPE = gql`
    getUsersOfType($role: UserRoleEnum) {
        getUsersOfType(role: $role) {
            _id
            role
            fName
            lName
            email
        }
    }
`;