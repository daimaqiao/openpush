var db= require("./mqtt").init();
var mqtt_user= require("../models/mqtt_user");

mqtt_user.find(function(err, obj) {
	if(err) {
		console.error("ERROR:", err);
		db.disconnect();
		return;
	}

	console.log("obj:", obj);

	db.disconnect();
});
