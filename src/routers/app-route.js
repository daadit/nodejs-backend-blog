const router = require("express").Router();
const homeController = require("../controllers").home;
const categoryController = require("../controllers").category;
const articleController = require("../controllers").article;
const tagsController = require("../controllers").tags;
const inboxController = require("../controllers").inbox;
const subscriberController = require("../controllers").subscriber;
const verifyUser = require("../configs/verify");

router.get("/", verifyUser.isLogin, homeController.home);
// Category
router.get("/category", verifyUser.isLogin, categoryController.list);
router.post("/category/save", verifyUser.isLogin, categoryController.save);
router.post("/category/update", verifyUser.isLogin, categoryController.update);
router.post("/category/delete", verifyUser.isLogin, categoryController.delete);
// Article
router.get("/article", verifyUser.isLogin, articleController.list);
router.post("/article/save", verifyUser.isLogin, articleController.save);
router.post("/article/update", verifyUser.isLogin, articleController.update);
router.post("/article/delete", verifyUser.isLogin, articleController.delete);
router.get("/article/new", verifyUser.isLogin, articleController.new);
// Tags
router.get("/tags", verifyUser.isLogin, tagsController.list);
router.post("/tags/save", verifyUser.isLogin, tagsController.save);
router.post("/tags/update", verifyUser.isLogin, tagsController.update);
router.post("/tags/delete", verifyUser.isLogin, tagsController.delete);
// Inbox
router.get("/inbox", verifyUser.isLogin, inboxController.list);
// Subscriber
router.get("/subscribers", verifyUser.isLogin, subscriberController.list);

module.exports = router;
