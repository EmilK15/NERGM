const User = require('../../models').models.user;
const logger = require('../../logger');

const jwt = require('jsonwebtoken');
const { UserInputError, ForbiddenError } = require('apollo-server');
const { isAuthenticated } = require('./auth');
const { combineResolvers } = require('graphql-resolvers');
const bcrypt = require('bcryptjs');

const createToken = async (user, secret, expiresIn) => {
    const { _id, email, fName, lName, role } = user;
    return await jwt.sign({ _id, email, fName, lName, role}, secret, { expiresIn } );
};

module.exports = {
    Mutation: {
        registerUser: async (parent, params, {secret, res} ) => {
            try {
                const newUser = new User(params.user);
                const savedUser = await newUser.save();

                if(!savedUser)
                    throw new UserInputError('Unable to save a user with those credentials.');

                const token = { token: await createToken(user, secret, '30m') };
                res.cookie('jwt', token.token, { httpOnly: true, maxAge: 1000 * 60 * 30, });
                return savedUser;
            } catch (err) {
                logger.error('unable to registerUser');
                logger.error(err);                
                return err;
            }
        },
        updateUser: combineResolvers(
            isAuthenticated,
            async (parent, {user}, { userSession, secret, res }) => {
                try {
                    let { email, fName, lName, newPassword, confirmPassword } = user;
                    const newEmail = email || userSession.email;
                    const newFName = fName || userSession.fName;
                    const newLName = lName || userSession.lName;
                    
                    if(newPassword && confirmPassword) {
                        const regex = /(?=.*?[0-9])(?=.*?[A-Za-z]).{8,20}$/;
                        if(newPassword === confirmPassword && newPassword.match(regex)) {
                            const newUpdate = {
                                email: newEmail,
                                fName: newFName,
                                lName: newLName,
                                password: newPassword
                            };
                            const updatedUser = await User.findOneAndUpdate({email}, newUpdate, { new: true });

                            if(!updatedUser)
                                throw new UserInputError('Entered a wrong input for updating');

                            return {
                                _id: updatedUser._id,
                                email: updatedUser.email,
                                fName: updatedUser.fName,
                                lName: updatedUser.lName,
                                role: updatedUser.role
                            };
                        }
                    }
                } catch (err) {
                    logger.error('error occured when trying to update user', err);
                    return err;
                }
            }
        ),
        logout: combineResolvers(
            isAuthenticated,
            async(parent, params, {res}) => {
                res.clearCookie('jwt');
                return true;
            }
        )
    },
    Query: {
        
    }
};