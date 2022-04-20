const config = require('../configs/database');

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    list(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM t_inbox;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('inbox', {
                        url: URL,
                        // urlFront: URLFRONT,
                        userName: req.session.username,
                        userId: req.session.id_user,
                        inbox: results,
                    });
                }
            );
            connection.release();
        });
    },
};
