// native::authmgr.js
// 2016.7.28
// daimaqiao@126.com

module.exports= {
	// 是否已认证
	check: function(session) {
		return session.username && session.authed;
	},

	// 认证
	auth: function(obj, session) {
		if(obj.username == "xxx" && obj.password == "999") {
			session.username= obj.username;
			session.authed= true;
		} else {
			session.username= "";
			session.authed= false;
		}
		return session.authed;
	},

	// 清除认证
	clear: function(session) {
		session.username= "";
		session.authed= false;
	}

};
