const User = require('../../models').models.user;
const logger = require('../../logger');

const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server');
const { isAuthenticated } = require('./auth');
const { combineResolvers } = require('graphql-resolvers');
const bcrypt = require('bcryptjs');

const createToken = async (user, secret, expiresIn) => {
    const { id, email, fName, lName, role } = user;
    return await jwt.sign({ id, email, fName, lName, role}, secret, { expiresIn } );
};

module.exports = {
    Mutation: {
        registerUser: async (parent, params, {secret, res} ) => {
            try {
                const newUser = new User(params.user);
                const savedUser = await newUser.save();

                if(savedUser) {
                    const token = { token: await createToken(user, secret, '30m') };
                    res.cookie('jwt', token.token, { httpOnly: true, maxAge: 1000 * 60 * 30, });
                    return savedUser;
                }
            } catch (err) {
                logger.error('unable to registerUser');
                logger.error(err);
                return err;
            }
        },
    },
    Query: {

    }
};