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
        registerUser: async (parent, { user }, {secret, res} ) => {
            try {
                const newUser = new User(user);
                const savedUser = await newUser.save();
                if(!savedUser)
                    throw new UserInputError('Email in use already');

                const token = { token: await createToken(savedUser, secret, '30m') };
                res.cookie('jwt', token.token, { httpOnly: true, maxAge: 1000 * 60 * 30 });
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

                            const token = { token: await createToken(updatedUser, secret, '30m') };

                            res.cookie('jwt', token.token, { httpOnly: true, maxAge: 1000 * 60 * 30, });
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
        signIn: async (parent, {email, password}, {res, secret}) => {
            try {
                const user = await User.findOne({email});
                const isMatch = await user.comparePassword(password);
                if(isMatch) {
                    const token = { token: await createToken(user, secret, '30m') };
                    res.cookie('jwt', token.token, { httpOnly: true, maxAge: 1000 * 60 * 30, });
                    return user;
                } else {
                    throw new ForbiddenError('Invalid credentials');
                }
            } catch (err) {
                logger.error('error in signIn', err);
                return err;
            }
        },
        logout: combineResolvers(
            isAuthenticated,
            async (parent, params, {res}) => {
                res.clearCookie('jwt');
                return true;
            }
        )
    },
    Query: {
        getMe: combineResolvers(
            isAuthenticated,
            async (parent, params, {userSession}) => {
                return userSession;
            }
        ),
        getUsersOfType: combineResolvers(
            isAuthenticated,
            async (parent, { role }) => {
                const users = User.find({ role });
                return users;
            }
        )
    }
};