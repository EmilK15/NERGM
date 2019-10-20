'use strict';

const express = require('express');
const app = express();
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const jwt = require('jsonwebtoken');
var path = require('path');
const secretKey = require('../config').secretKey;
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const DataLoader = require('dataloader');

app.get('/', function(req, res) {
    res.render('index');
});

const getSession = async (req) => {
    const token = req.cookies['jwt'];
    if(token) {
        try {
            return await jwt.verify(token, secretKey);
        } catch(err) {
            throw new AuthenticationError('Session expired. Please login again.');
        }
    }
};

/*
    Use batchUsers if you want to set a temporary store for users on request.
    Though this is mostly and in-memory soluton, so stick to redis for more
    consistent operations.
*/
// const batchUsers = async (keys) => {
//     const users = await models.User.findAll({
//         where: { 
//             id: {
//                 $in: keys,
//             },
//         },
//     });
//     return keys.map(key => users.find(user => user.id === key));
// };

const apollo_graph = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
        const userSession = await getSession(req);
        return {
            res,
            userSession,
            secret: secretKey,
            // loaders: {
            //     user: new DataLoader(keys => batchUsers(keys)),
            // },
        };
    }
});

apollo_graph.applyMiddleware({ app, path: '/graphql'});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/views/index.html'));
});

module.exports = app;