// routes::login.js
// 2016.7.26
// daimaqiao@126.com

var express = require("express");
var router = express.Router();
var authmgr= require("../native/authmgr");


router.get("/", function(req, res, next) {
	if(authmgr.check(req.session))
		res.redirect("/accmagr");
	else
		res.redirect("/login");
});
router.get("/login", function(req, res, next) {
	authmgr.clear(req.session);
	res.render("login", { title: "登录OpenPUSH" });
});


router.post("/login", function(req, res, next) {
	if(authmgr.auth(req.body, req.session))
		res.redirect("/accmagr");
	else
		res.redirect("/login");
});

module.exports = router;
