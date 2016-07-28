var app= angular.module("accmagrApp", []);

app.factory("accmagrUsers", ["$http", accmagrUsers]);
function accmagrUsers($http) {
	var obj= {};
	// 帐户清单
	obj.list= function(cb) {
		$http.post("/accmagr/users/list", {})
			.then(
				function _ok(res) {
					cb(null, res.data);
				},
				function _err(res) {
					cb(res);
				});
	};

	// 添加帐户
	obj.add= function(username, password, topics, cb) {
		$http.post("/accmagr/users/add", {
			username: username,
			password: password,
			topics: topics
		})
			.then(
				function _ok(res) {
					cb(null, res.data);
				},
				function _err(res) {
					cb(res);
				});
	};

	// 删除帐户
	obj.del= function(username, cb) {
		$http.post("/accmagr/users/del", {
			username: username
		})
			.then(
				function _ok(res) {
					cb(null, res.data);
				},
				function _err(res) {
					cb(res);
				});
	};

	//
	return obj;
}


app.controller("accmagrController", ["$scope", "accmagrUsers", accmagrController]);
function accmagrController($scope, accmagrUsers) {
	$scope.userlist= [];
	accmagrUsers.list(function(err,obj) {
		if(!err && obj && obj.length>0)
			$scope.userlist= obj;
	});

	$scope.save= function() {
		if($scope.username && $scope.password && $scope.topics) {
			accmagrUsers.add($scope.username, $scope.password, $scope.topics,
					function(err,obj) {
						if(!err) {
							$scope.userlist.push({
								username: $scope.username,
								topics: $scope.topics
							});
							$scope.username= "";
							$scope.password= "";
							$scope.topics= "";
							alert("用户帐户已添加！");
						} else {
							alert("保存帐户信息时发生网络故障，请刷新页面后重试！");
						}
					});

		} else {
			alert("请填入完整的帐户，密码和订阅信息！");
		}
	};

	$scope.delete= function(user) {
		if(user.username) {
			accmagrUsers.del(user.username, function(err,obj) {
				if(!err) {
					for(var i=0; i<$scope.userlist.length; i++) {
						if($scope.userlist[i].username == user.username) {
							$scope.userlist.splice(i,1);
							break;
						}
					}// for
					alert("已删除！");
				} else {
					alert("删除失败，请刷新页面后重试！");
				}
			});
		}

	};
}

