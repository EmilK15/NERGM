const { gql } = require('apollo-server-express');
const userSchema = require('./userSchema');

var schema = gql`
    type Query {
        _: String
    }
    
    type Mutation {
        _: String
    }
`;

module.exports = [schema, userSchema];