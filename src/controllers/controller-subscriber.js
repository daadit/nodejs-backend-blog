const config = require("../configs/database");
const slug = require("slug");
const moment = require("moment");

let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    list(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tb_subscribe;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render("subscriber", {
                        url: URL,
                        userName: req.session.username,
                        userId: req.session.id_user,
                        moment: moment,
                        subs: results,
                    });
                }
            );
            connection.release();
        });
    },
};
