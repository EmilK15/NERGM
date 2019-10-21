const User = require('../../models').models.user;
const logger = require('../../logger');
const jwt = require('jsonwebtoken');
const { UserInputError, ForbiddenError } = require('apollo-server');
const { isAuthenticated } = require('./auth');
const { combineResolvers } = require('graphql-resolvers');

const createToken = async (user, secret, expiresIn) => {
    const { _id, email, fName, lName, role } = user;
    return await jwt.sign({ _id, email, fName, lName, role}, secret, { expiresIn } );
};

module.exports = {
    Mutation: {
        registerUser: async ({}, params, {secret, res} ) => {
            try {
                const newUser = new User(params.user);
                const savedUser = await newUser.save();

                if(!savedUser)
                    throw new UserInputError('Email or Username in use already');

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
            async ({}, {user}, { userSession, secret, res }) => {
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
        signIn: async ({}, {email, password}, {res}) => {
            try {
                const user = await User.findOne({email});
                const isMatch = await user.comparePassword(password);
                if(isMatch) {
                    if(!user.lockUntil) {
                        const newUpdate = {
                            $set: { loginAttempts: 0 },
                            $unset: { lockUntil: 1 }
                        };
                        const updatedUser = await User.findOneAndUpdate({email}, newUpdate, { new: true });
                        if(updatedUser) {
                            return updatedUser;
                        }
                    } else {
                        throw new ForbiddenError('You have been locked out, you still need to wait ' + user.lockUntil/6000 + ' minutes.');
                    }
                } else {
                    if(user.lockUntil)
                        throw new ForbiddenError('You have been locked out, please try again soon');
                    user.incLoginAttempts();
                    if(user.lockUntil)
                        throw new ForbiddenError('You ahve been locked out for 1 hour.');
                    throw new ForbiddenError('Invalid credentials');
                }
            } catch (err) {
                logger.error('error in signIn', err);
                return err;
            }
        },
        logout: combineResolvers(
            isAuthenticated,
            async ({}, {}, {res}) => {
                res.clearCookie('jwt');
                return true;
            }
        )
    },
    Query: {
        getMe: combineResolvers(
            isAuthenticated,
            async ({}, {}, {userSession}) => {
                return {
                    email: userSession.email,
                    fName: userSession.fName,
                    lName: userSession.lName,
                    role: userSession.role
                };
            }
        ),
        getUsersOfType: combineResolvers(
            isAuthenticated,
            async ({}, { role }, {}) => {
                const users = User.find({ role });
                return users;
            }
        )
    }
};