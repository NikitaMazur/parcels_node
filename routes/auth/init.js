const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const admin = {username: 'admin', password: 'admin'}
const adminToken = '550c2ea3-6c72-49b9-afaa-e56efe47c1f0';

passport.serializeUser((token, done) => {
    done(null, token);
});

passport.deserializeUser((token, done) => {
    if (token === adminToken) {
        return done(null, admin);
    }

    done('Not found');
});

passport.authMiddleware = () => {
    return (req, res, next) => {
      if (req.isAuthenticated() || req.headers.token === adminToken) {
        return next()
      }

      res.sendStatus(401);
    }
  }

passport.use(new LocalStrategy((username, password, done) => {
    if (username === admin.username && password === admin.password) {
        return done(null, adminToken)
    }

    return done('Wrong Credentials');
}))