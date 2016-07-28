var msgpush= require("./msgpush");

var obj= {
	username: "temp",
	password: "temp",
	topic: "temp",
	message: "Hello message to temp",
	pushhost: "192.168.5.9:8083"
};

msgpush.send(obj, function(err,msg) {
	if(err) {
		console.error("ERROR:", err);
		return;
	}

	console.log("msg:", msg);
});
