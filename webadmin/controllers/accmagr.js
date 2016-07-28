// controllers::accmagr.js
// 2016.7.27
// daimaqiao@126.com

var mqtt_user= require("../models/mqtt_user");
var mqtt_acl= require("../models/mqtt_acl");

module.exports= {
	list: list,
	add: add,
	del: del
};


function list(cb) {
	mqtt_user.find(function(err, obj) {
		if(err) {
			cb(err);
			return;
		}

		var arr= [];
		for(var i=0; i<obj.length; i++) {
			arr.push({username: obj[i].username, topics: ""});
		}// for
		list_fill_arr(arr, 0, cb);
	});
}
function list_fill_arr(arr, idx, cb) {
	if(idx >= arr.length) {
		cb(null, arr);
		return;
	}
	mqtt_acl.findOne({username: arr[idx].username}, function(err, one) {
		if(err) {
			cb(err, arr);
			return;
		}
		arr[idx].topics= one.pubsub.join(",");
		list_fill_arr(arr, idx+1, cb);
	});
}


function add(username, password, topics, cb) {
	var user= new mqtt_user({
		username: username,
		password: password
	});
	var pubsub= topics.split(",");
	var acl= new mqtt_acl({
		username: username,
		pubsub: pubsub
	});
	user.save(function(err) {
		if(err)
			cb(err);
		else
			acl.save(cb);
	});
}


function del(username, cb) {
	var q= {username: username};
	mqtt_user.remove(q, function(err) {
		if(err)
			cb(err);
		else
			mqtt_acl.remove(q, cb);
	});
}

