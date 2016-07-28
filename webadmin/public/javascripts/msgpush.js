var app= angular.module("msgpushApp", []);

app.factory("msgpushDef", ["$location", msgpushDef]);
function msgpushDef($location) {
	return {
		pushhost: $location.host()+":8083",
		username: "temp",
		password: "temp",
		topic: "temp",
		message: "Hello message to temp"
	};
}


app.service("msgpushSend",
		["$http", msgpushSend]);
function msgpushSend($http) {
	this.sendMessage= function($scope, cbok, cberr) {
		var obj= {
			qos:0,
			retain:0,
			pushhost: $scope.pushhost,
			username: $scope.username,
			password: $scope.password,
			topic: $scope.topic,
			message: $scope.message
		};
		$http.post("/msgpush/messages/send", obj)
			.then(cbok, cberr);
	}
}


app.controller("msgpushController",
		["$scope", "$http", "msgpushDef", "msgpushSend", msgpushController]);
function msgpushController($scope, $http, msgpushDef, msgpushSend) {
	angular.extend($scope, msgpushDef);
	$scope.sendMessage= function() {
		msgpushSend.sendMessage($scope, ok, err);
	}

	function ok(res) {
		alert(res.status+ " "+ res.statusText+ "\r\n"+ res.data);
	}
	function err(res) {
		alert(res.status+ " "+ res.statusText+ "\r\n"+ res.data);
	}
}

