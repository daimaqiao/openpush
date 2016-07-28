// native::session.js
// 2016.7.28
// daimaqiao@126.com

var mongoose= require("mongoose");
var session= require("express-session");
var store= require("connect-mongo")(session);
module.exports= session({
	store: new store({mongooseConnection: mongoose.connection}),
	cookie: {maxAge: 1*60*60*1000},
	name: "openpush",
	secret: "openpush-webadmin 2016.7.28",
	resave: false,
	saveUninitialized: false
});
