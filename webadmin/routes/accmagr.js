// routes::accmagr.js
// 2016.7.26
// daimaqiao@126.com

var express = require("express");
var router = express.Router();
var accmagr= require("../controllers/accmagr");
var authmgr= require("../native/authmgr");

function gotoLogin(req, res) {
	if(authmgr.check(req.session))
		return false;
	res.redirect("/login");
	return true;
}

router.get("/", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	res.render("accmagr", {
	    maintitle: "OpenPUSH",
	    title: "帐户管理",
	    pages: [
	  	{ href:"accmagr", title:"帐户管理", active:1},
	  	{ href:"msgpush", title:"消息推送"}
	    ]
	});
});


router.get("/users/list", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	res.render("_form", {inputFields: []});
});
router.post("/users/list", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	accmagr.list(function(err,obj) {
		if(err) {
			res.type("text/plain").status(404).send("Not found!");
			return;
		}
		res.json(obj);
	});
});

router.get("/users/add", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	res.render("_form", {inputFields: [
		{text: "username", type: "text", name: "username"},
		{text: "password", type: "password", name: "password"},
		{text: "topics", type: "text", name: "topics"}
	]});
});
router.post("/users/add", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	var username= req.body.username;
	var password= req.body.password;
	var topics= req.body.topics;
	accmagr.add(username, password, topics, function(err,obj) {
		if(err) {
			res.type("text/plain").status(404).send("Not found!");
			return;
		}
		res.json(obj);
	});
});

router.get("/users/del", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	res.render("_form", {inputFields: [
		{text: "username", type: "text", name: "username"}
	]});
});
router.post("/users/del", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	var username= req.body.username;
	accmagr.del(username, function(err,obj) {
		if(err) {
			res.type("text/plain").status(404).send("Not found!");
			return;
		}
		res.json(obj);
	});
});


module.exports = router;
