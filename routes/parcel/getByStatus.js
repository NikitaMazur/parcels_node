module.exports = (req, res, next) => {
    req.getConnection((err, con) => {
        if (err) 
            return next(err);

        const status = req.query.status;

        con.query(`SELECT * FROM parcels WHERE status ${status ? '=?': 'is NULL'}`, status, (err, result) => {
            if (err) 
                return next(err);
            
            res.send(result);
        })
    })
}