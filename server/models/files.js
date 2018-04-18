const File = require('../lib/file').File
const path = require('path')
const fs = require('fs')

const fileOperate = {
	// 上传一个文件
	create (file) {
		return File.create(file)
	},
	// 通过 id 获取文件
	getFileById (id) {
		return File
			.findOne({ _id: id })
			// .addCreatedAt()
			.exec()
	},
	// 通过 id 删除文件
	async deleteFileById (id) {
		let fileObject = await fileOperate.getFileById(id)
		fs.unlink(path.join('../uploads',fileObject.filename))
		return File
			.remove({ _id: id })
			.exec()
	},
	// 获取文件路径
	getFilePath (id) {
		let fileObject = await fileOperate.getFileById(id)
		return path.join('../uploads',fileObject.filename)
	}
}
module.exports = fileOperate