'use strict';

const GraphQLJSON = require('graphql-type-json');

const objectSchema = `
    scalar JSON

    type Object {
        id: String!
        parmA: String!
        parmB: String!
        parmC: String
    }

    type Query {
        getObject(id: String!): Object!
    }

    type Mutation {
        createObject(object: Object): JSON!
    }
`;

module.exports = objectSchema;