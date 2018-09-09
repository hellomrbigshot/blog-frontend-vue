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
	// 通过第三方登录信息获取用户信息
	getUserByOauthInfo (object) {
		return User
			.findOne({ 'oauthinfo': { $elemMatch: { type: object.type, name: object.name }}})
			.exec()
	},
	// 添加一条第三方授权信息
	insertUserOauth (object) {
		return User
			.update({ username: object.username }, { $push: { oauthinfo: { type: object.type, avatar_url: object.avatar_url, name: object.name }}})
			.exec()
	},
	// 获取所有用户列表
	getUserList (pageSize, Count) {
		return User
			.find()
			.skip(Count)
			.limit(pageSize)
			.exec()
	},
	// 获取用户数量
	getUserNum () {
		return User
			.find()
			.count()
			.exec() 
	},
	// 编辑头像
	updateAvatar (object) {
		return User
			.update({ username: object.username }, { avatar: object.avatar })
			.exec()
	},
	// 编辑个人简介
	updateBio (object) {
		return User
			.update({ username: object.username }, { bio: object.bio })
			.exec()
	}
}