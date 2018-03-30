const User = require('../lib/user').User

module.exports = {
	// 注册一个用户
	create (user) {
		return User.create(user)
	},
	// 通过用户名获取用户信息
	getUserByName (username) {
		return User
			.findOne({ username: username })
			.exec()
	},
	// 获取所有用户列表
	getUserList (pageSize, Count) {
		return User
			.find()
			.skip(Count)
			.limit(pageSize)
			.exec()
	}
}