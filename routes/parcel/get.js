module.exports = (req, res, next) => {
    req.getConnection((err, con) => {
        if (err) 
            return next(err);

        con.query('SELECT * FROM parcels WHERE id=?', req.params.id, (err, result) => {
            if (err) 
                return next(err);
            
            if (result && result[0]) {
                res.send(result[0]);
            } else {
                res.sendStatus(404);
            }
        })
    })
}