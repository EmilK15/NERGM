'use strict';

const GraphQLJSON = require('graphql-type-json');

const objectSchema = `
    scalar JSON

    type Object {
        id: String!
        paramA: String!
        paramB: String!
        paramC: String
    }

    input inputObject {
        id: String!
        paramA: String!
        paramB: String!
        paramC: String
    }

    type Query {
        getObject(id: String!): Object!
    }

    type Mutation {
        createObject(object: inputObject): JSON!
    }
`;

module.exports = objectSchema;