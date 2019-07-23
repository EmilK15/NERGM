'use strict';

const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const depthLimit = require('graphql-depth-limit');
const schema = require('./graphql/schema/');
const root = require('./graphql/resolvers/');
var path = require('path');
app.get('/', function(req, res) {
    res.render('index');
});

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    validationRules: [depthLimit(10)]
}))

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/views/index.html'));
});

module.exports = app;