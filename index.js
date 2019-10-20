const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const logger = require('./app/logger');
var routes = require('./app/routes');
var server = require('http').Server(app);

app.use(compression());
app.use(helmet());
app.use(cors({
    credentials: true
}));

app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if(!process.env.NODE_ENV)
    app.use(morgan('dev', { stream: logger.stream}));

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', routes);

server.listen(port);

module.exports = server;