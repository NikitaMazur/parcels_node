const parcelsProps = require('./utils/parcelProps');

module.exports = (req, res, next) => {
    req.getConnection((err, con) => {
        if (err) 
            return next(err);

        const data = parcelsProps(req.body);
        
        con.query('INSERT INTO parcels set ?', data, (err, result) => {
            if (err) 
                return next(err);
            
            res.sendStatus(200);
        })
    })
}