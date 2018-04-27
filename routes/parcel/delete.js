module.exports = (req, res, next) => {
    req.getConnection((err, con) => {
        if (err) 
            return next(err);

        con.query('DELETE FROM parcels WHERE id=?', req.params.id, (err, result) => {
            if (err) 
                return next(err);
            
            if (result.affectedRows) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        })
    })
}