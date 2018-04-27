const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connection = require('express-myconnection');
const mysql = require('mysql');

const app = express();

app.use(cookieParser());
// parse body
app.use(bodyParser.urlencoded({extended: true})); //support x-www-form-urlencoded
app.use(bodyParser.json());

// enable cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

// mysql dn init
const dbInit = require('./db/mysql/init');
const dbConfig = require('./db/mysql/config');

dbInit();

app.use(connection(mysql, dbConfig, 'pool'));

// session and authorization
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisConfig = require('./db/redis/config');

app.use(session({
    store: new RedisStore({url: redisConfig.url}),
    secret: redisConfig.secret,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// api
app.use('/auth', require('./routes/auth'));
app.use('/parcels', require('./routes/parcel'));

// global error handler
app.use(function (err, req, res, next) {
    console.error(err);
    res
        .status(500)
        .send('Server error!');
});

app.listen(3001, () => {
    console.log('Start server');
})