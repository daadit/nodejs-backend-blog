const config = require("../configs/database");
const slug = require("slug");

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
                SELECT * FROM tb_category;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render("category", {
                        url: URL,
                        // urlFront: URLFRONT,
                        userName: req.session.username,
                        userId: req.session.id_user,
                        category: results,
                    });
                }
            );
            connection.release();
        });
    },
    save(req, res) {
        let categorySlug = slug(req.body.name);
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `INSERT INTO tb_category SET ? `,
                {
                    name: req.body.name,
                    slug: categorySlug,
                },
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/category");
                }
            );
            connection.release();
        });
    },
    update(req, res) {
        let categorySlug = slug(req.body.name);
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `UPDATE tb_category SET
                name = ?,
                slug = ?
            WHERE category_id = ?`,
                [req.body.name, categorySlug, req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/category");
                }
            );
            connection.release();
        });
    },
    delete(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM tb_category
                WHERE category_id = ?`,
                [req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect("/category");
                }
            );
            connection.release();
        });
    },
};
