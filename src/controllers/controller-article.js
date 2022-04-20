const config = require('../configs/database');
const moment = require('moment');

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
                SELECT * FROM t_article JOIN 
                t_category ON t_article.category_id=t_category.category_id;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('article', {
                        url: URL,
                        // urlFront: URLFRONT,
                        userName: req.session.username,
                        userId: req.session.id_user,
                        moment: moment,
                        article: results,
                    });
                }
            );
            connection.release();
        });
    },
    new(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM t_article JOIN 
                t_category ON t_article.category_id=t_category.category_id;
                `,
                function (error, results) {
                    if (error) throw error;
                    res.render('article-add', {
                        url: URL,
                        // urlFront: URLFRONT,
                        userName: req.session.username,
                        userId: req.session.id_user,
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
                `INSERT INTO t_category SET ? `,
                {
                    name: req.body.name,
                    slug: categorySlug,
                },
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/category');
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
                `UPDATE t_category SET
                name = ?,
                slug = ?
            WHERE category_id = ?`,
                [req.body.name, categorySlug, req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/category');
                }
            );
            connection.release();
        });
    },
    delete(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `DELETE FROM t_category
                WHERE category_id = ?`,
                [req.body.id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/category');
                }
            );
            connection.release();
        });
    },
};
