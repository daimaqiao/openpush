// controllers::msgpush.js
// 2016.7.28
// daimaqiao@126.com

const child= require("child_process");
const util= require("util");

module.exports= {
	send: send
};

function send(obj, cb) {
	var format= "curl --basic -u %s:%s "+
		"-d 'qos=%d&retain=%d&topic=%s&message=%s' "+
		"-k 'http://%s/mqtt/publish'";
	var cmd= util.format(format, obj.username, obj.password,
			(obj.qos? 1: 0), (obj.retail? 1: 0),
			encodeURIComponent(obj.topic? obj.topic: ""),
			encodeURIComponent(obj.message? obj.message: ""),
			obj.pushhost);

	console.log(cmd);

	child.exec(cmd, cb);
};

