const login = require("./controller-login");
const home = require("./controller-home");
const category = require("./controller-category");
const article = require("./controller-article");
const tags = require("./controller-tags");
const inbox = require("./controller-inbox");
const subscriber = require("./controller-subscriber");

module.exports = {
    login,
    home,
    category,
    article,
    tags,
    inbox,
    subscriber,
};
