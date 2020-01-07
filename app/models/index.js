const logger = require('../logger');
const config = require('../config/config');
const bluebird = require('bluebird');
const Mongoose = bluebird.promisifyAll(require('mongoose'));
Mongoose.Promise = require('bluebird');
Mongoose.set('useCreateIndex', true);

const database = Mongoose.connectAsync(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(function(err){
    logger.error('Unable to connect to mongoose', err);
});

process.on('SIGINT', () => {
    Mongoose.connection.close(() => {
        process.exit(0);
    });
});

module.exports = {
    database,
    models: {
        user: require('./user')
    }
};