module.exports = (req, res, next) => {
    req.getConnection((err, con) => {
        if (err) 
            return next(err);
        
        con.query('SELECT * FROM parcels', (err, result) => {
            if (err) 
                return next(err);
            
            res.send(result);
        })
    })
}