
const config = require('../config/config');
const bluebird = require('bluebird');
const Mongoose = bluebird.promisifyAll(require('mongoose'));
Mongoose.Promise = require('bluebird');

const database = Mongoose.connectAsync(config.database, {
    useMongoClient: true,
    useNewUrlParser: true
}).catch(function(err){
   console.log(err);
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