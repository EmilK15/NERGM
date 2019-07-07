'use strict';

const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const depthLimit = require('graphql-depth-limit');
const schema = require('./graphql/schema/');
const root = require('./graphql/resolvers/');

app.get('/', function(req, res) {
    res.render('index');
});

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    validationRules: [depthLimit(10)]
}))

app.use(function(req, res) {
    res.status(404).redirect('/');
});

module.exports = app;