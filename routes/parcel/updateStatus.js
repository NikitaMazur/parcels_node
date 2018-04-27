const parcelsProps = require('./utils/parcelProps');

module.exports = (req, res, next) => {
    req.getConnection((err, con) => {
        if (err) 
            return next(err);
            
        if (!req.query.ids) {
            return next('Wrong data');
        }

        const ids = req.query.ids.split(',').map(x => parseInt(x, 10));
        
        con.query('UPDATE parcels set status=? WHERE id IN (?)', [req.query.status, ids], (err, result) => {
            if (err) 
                return next(err);
            
            res.sendStatus(200);
        })
    })
}