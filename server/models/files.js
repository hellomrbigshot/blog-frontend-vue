const File = require('../lib/file').File

module.exports = {
	// 注册一个用户
	create (file) {
		return File.create(file)
	},
	// 通过用户名获取用户信息
	getFileById (id) {
		return File
			.findOne({ _id: id })
			// .addCreatedAt()
			.exec()
	}
}