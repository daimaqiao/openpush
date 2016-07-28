var db= require("../mongoose/mqtt").init();
var accmagr= require("./accmagr");

console.log(" *** list *** ");
list(function() {

	console.log(" *** add *** ");
	add("xxx","1234567","+1,+2,+3", function() {

		console.log(" *** list after add *** ");
		list(function() {

			console.log(" *** del *** ");
			del("xxx", function() {

				console.log(" *** list after del *** ");
				list(function() {
					db.disconnect();
				});
			});// del
		});
	});// add
});

function list(next) {
	accmagr.list(function(err, obj) {
		if(err) {
			console.error("ERROR:", err);
			db.disconnect();
			return;
		}
		console.log("obj:", obj);
		if(next)
			next();
	});
}


function add(username, password, topics, next) {
	accmagr.add(username, password, topics, function(err, obj) {
		if(err) {
			console.error("ERROR:", err);
			db.disconnect();
			return;
		}
		console.log("add ok");
		if(next)
			next();
	});
}


function del(username, next) {
	accmagr.del(username, function(err, obj) {
		if(err) {
			console.error("ERROR:", err);
			db.disconnect();
			return;
		}
		console.log("del ok");
		if(next)
			next();
	});
}

