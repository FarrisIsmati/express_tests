//https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
require('dotenv').config()

//DEPENDENCIES
const app           = require('express')();
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const config        = require('config');

//ROUTES
const book          = require('./controllers/routes/book');

//APP
const port = app.set('port', process.env.PORT || 8080);

switch (process.env.NODE_ENV) {
    case 'dev':
        console.log('running dev');
        //Log only on dev
        app.use(morgan('combined'));
        break;
    case 'test':
        console.log('running test');
        break;
    case 'prod':
        console.log('running prod');
        break;
}

//SCHEMAS
const mongoose      = require('./controllers/db/connection');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ROUTES
app.use('/book', book);

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('You are flying on ' + app.get('port'));
});

module.exports = app; // for testing
