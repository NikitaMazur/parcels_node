const passport = require('passport');
const {Router} = require('express');

require('./init');

const router = new Router();

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) 
            return res.status(401).send(err || info);

        req
            .logIn(user, function (err) {
                if (err) 
                    return res.status(401).send(err);
                
                return res.status(200).send(user);
            });
    })(req, res, next);
});
router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;