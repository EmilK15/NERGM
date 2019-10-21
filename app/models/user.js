const promise = require('bluebird');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = promise.promisifyAll(require('bcryptjs')),
    SALT_WORK_FACTOR = 10,
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 1 * 60 * 60 * 1000;
const logger = require('../logger');

const userSchema = new Schema({
    email: {type: String, required: [true, 'Need an email'], index: {unique: true}},
    password: {type: String, required: true},
    loginAttempts: {type: Number, required: true, default: 0},
    lockUntil: {type: Number},
    role: {type: String, enum: ['USER', 'ADMIN']}
});

userSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.genSaltAsync(SALT_WORK_FACTOR)
        .then(function(salt){
            return bcrypt.hashAsync(user.password, salt);
        })
        .then(function(hash) {
            user.password = hash;
            next();
        })
        .catch(function(e) {
            logger.error('Salting error ' + e);
        })
        .catch(function(e) {
            logger.error('Hash error ' + e);
        });
});

userSchema.methods.incLoginAttempts = function(cb) {
    //if the lock has expired, reset lock attempt to 1
    if(this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: {loginAttempts: 1},
            $unset: {lockUntil: 1}
        }, cb);
    }
    var updates = { $inc: {loginAttempts: 1} };
    if(this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME};
    }
    return this.update(updates, cb);
};

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compareAsync(candidatePassword, this.password)
        .then(function(isMatch) {
            cb(null, isMatch);
        })
        .catch(function(err) {
            return cb(err, null);
        });
};

module.exports = mongoose.model('User', userSchema);