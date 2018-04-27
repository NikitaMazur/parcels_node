const { mapObjIndexed } = require('ramda');
const parcelProps = require('./utils/parcelProps');

module.exports = (req, res, next) => {
    req.getConnection((err, con) => {
        if (err) 
            return next(err);

        const search = parcelProps(req.query);
        const keys = [];
        const values = [];

        mapObjIndexed((value, key) => {
            keys.push(`${key} LIKE ?`);
            values.push(value + '%');
        }, search);

        if (!keys.length) {
            return res.sendStatus(404);
        }

        con.query(`SELECT * FROM parcels WHERE ${keys.join(' AND ')}`, values, (err, result) => {
            if (err) 
                return next(err);
            
            res.send(result);
        })
    })
}