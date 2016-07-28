// mongoose::schemas::mqtt_acl.js
// 2016.7.27
// daimaqiao@126.com

var mongoose= require("mongoose");

var mqtt_acl= new mongoose.Schema({
	username: String,
	pubsub: [String]
}, {collection: "mqtt_acl"});


module.exports= mqtt_acl;
