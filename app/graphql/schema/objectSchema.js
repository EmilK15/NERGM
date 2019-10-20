'use strict';

const objectSchema = `

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
        createObject(object: inputObject): Object!
    }
`;

module.exports = objectSchema;