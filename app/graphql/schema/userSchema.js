const { gql } = require('apollo-server-express');

module.exports = gql`

    enum UserRoleEnum {
        ADMIN
        USER
    }

    type User {
        _id: String!
        role: UserRoleEnum!
        email: String!
        password: String!
        fName: String!
        lName: String!
    }

    type Me {
        _id: String!
        role: UserRoleEnum!
        fName: String!
        lName: String!
        email: String!
    }

    type Token {
        token: String!
    }

    input userInput {
        email: String!
        password: String!
        fName: String!
        lName: String!
        role: UserRoleEnum!
    }

    input userEdit {
        email: String
        newPassword: String
        confirmPassword: String
        fName: String
        lName: String
    }

    extend type Query {
        getMe: Me!
        getUsersOfType(role: UserRoleEnum): [Me!]
    }

    extend type Mutation {
        registerUser(user: userInput): Me!
        updateUser(user: userEdit): Me!
        signIn(email: String!, password: String!): Me!
        logout: Boolean!
    }
`;