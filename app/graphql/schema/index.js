const { buildSchema } = require('graphql');
const objectSchema = require('./objectSchema');

var schema = buildSchema(`
    ${objectSchema}
`);

module.exports = schema;