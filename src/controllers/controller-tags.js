const config = require("../configs/database");
// const slug = require('slug');

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
                SELECT * FROM tb_tags;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render("tags", {
                        url: URL,
                        // urlFront: URLFRONT,
                        userName: req.session.username,
                        userId: req.session.id_user,
                        tags: results,
                    });
                }
            );
            connection.release();
        });
    },
    save(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `INSERT INTO tb_tags SET ? `,
                {
                    name: req.body.name,
                },
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/tags");
                }
            );
            connection.release();
        });
    },
    update(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `UPDATE tb_tags SET
                    name = ?
                WHERE tags_id = ?`,
                [req.body.name, req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/tags");
                }
            );
            connection.release();
        });
    },
    delete(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM tb_tags
                WHERE tags_id = ?`,
                [req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/tags");
                }
            );
            connection.release();
        });
    },
};
