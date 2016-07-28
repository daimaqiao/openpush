// msgpush.js
// 2016.7.26
// daimaqiao@126.com

var express = require("express");
var router = express.Router();
var msgpush= require("../controllers/msgpush");
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

  res.render("msgpush", {
	  maintitle: "OpenPUSH",
	  title: "消息推送",
	  pages: [
		{ href:"accmagr", title:"帐户管理" },
		{ href:"msgpush", title:"消息推送", active:1}
	  ]
  });
});

router.post("/", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	res.type("text/plain").send("ok");
});


router.get("/messages/send", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	res.render("_form", {inputFields: [
		{text: "pushhost", type: "text", name: "pushhost"},
		{text: "username", type: "text", name: "username"},
		{text: "password", type: "password", name: "password"},
		{text: "topic", type: "text", name: "topic"},
		{text: "message", type: "text", name: "message"}
	]});
});
router.post("/messages/send", function(req, res, next) {
	if(gotoLogin(req,res))
		return;

	var obj= {
		pushhost: req.body.pushhost,
		username: req.body.username,
		password: req.body.password,
		topic: req.body.topic,
		message: req.body.message
	};
	msgpush.send(obj, function(err,msg) {
		if(err) {
			res.type("text/plain").status(404).send("Not found!");
			return;
		}
		res.type("text/plain").send(msg);
	});
});


module.exports = router;
