const mysql = require('mysql');
const config = require('./config');

module.exports = () => {
    const connection = mysql.createConnection(config);

    connection.connect(function (err) {
        if (err) 
            throw err;
        
        connection
            .query(`CREATE DATABASE IF NOT EXISTS ${config.database}`, function (err) {
                if (err) 
                    throw err;
                
                connection
                    .query(`USE ${config.database}`, function (err) {
                        if (err) 
                            throw err;
                        
                        connection
                            .query(`CREATE TABLE IF NOT EXISTS parcels(
                                id INT NOT NULL AUTO_INCREMENT,PRIMARY KEY(id),
                                courier_name VARCHAR(30),
                                reference VARCHAR(50),
                                recipient_first_name VARCHAR(30),
                                recipient_last_name VARCHAR(30),
                                recipient_location VARCHAR(100),
                                status ENUM ('out for delivery', 'delivered')
                    )`, function (err) {
                                if (err) 
                                    throw err;
                                }
                            );
                    });
            });
    });
}