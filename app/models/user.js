const promise = require('bluebird');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = promise.promisifyAll(require('bcryptjs')),
    SALT_WORK_FACTOR = 10;
const logger = require('../logger');

const userSchema = new Schema({
    email: {type: String, required: [true, 'Need an email'], index: {unique: true}},
    password: {type: String, required: true},
    role: {type: String, enum: ['USER', 'ADMIN']},
    fName: {type: String, required: true},
    lName: {type: String, required: true}
});

userSchema.pre('save', async function(next) {
    const user = this;

    if(!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSaltAsync(SALT_WORK_FACTOR);
        const hash = await bcrypt.hashAsync(user.password, salt);
        user.password = hash;
        return next();
    } catch (err) {
        logger.error(err);
    }
});

/* Works for findByIdAndUpdate as it is a wrapper function of findOneAndUpdate */
userSchema.pre('findOneAndUpdate', async function(next) {
    if(!this._update.password) {
        return next();
    }
    try {
        const salt = await bcrypt.genSaltAsync(SALT_WORK_FACTOR);
        const hash = await bcrypt.hashAsync(this._update.password, salt);
        this._update.password = hash;
        return next();
    } catch (err) {
        logger.error(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compareAsync(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', userSchema);