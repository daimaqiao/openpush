// mongoose::schemas::mqtt_user.js
// 2016.7.27
// daimaqiao@126.com

var mongoose= require("mongoose");

var mqtt_user= new mongoose.Schema({
	username: String,
	password: String,
	is_superuser: Boolean
}, {collection: "mqtt_user"});


module.exports= mqtt_user;
