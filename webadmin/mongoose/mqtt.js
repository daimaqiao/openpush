// mongoose::mqtt.js
// 2016.7.27
// daimaqiao@126.com

var mongoose= require("mongoose");
mongoose.Promise= global.Promise;

module.exports= {
	init: init
};

function init() {
	var db= mongoose.connect("mongodb://localhost/mqtt");
	mongoose.model("mqtt_user",	require("./schemas/mqtt_user"));
	mongoose.model("mqtt_acl",	require("./schemas/mqtt_acl"));
	return db;
}

