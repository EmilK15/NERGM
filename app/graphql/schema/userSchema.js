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
        loginAttempts: Int
        lockUntil: Int
    }

    type Me {
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
        role: String!
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
        getUsersOfType(role: UserRoleEnum): [User!]
    }

    extend type Mutation {
        registerUser(user: userInput): User!
        updateUser(user: userEdit): User!
        signIn(email: String!, password: String!): User!
        logout: Boolean!
    }
`;