const File = require('../lib/file').File
const path = require('path')
const fs = require('fs')

let handleFile = {
	// 上传一个文件
	create (file) {
		return File.create(file)
	},
	// 通过 id 获取文件信息
	getFileById (id) {
		return File
			.findOne({ _id: id })
			// .addCreatedAt()
			.exec()
	},
}
// 通过 id 删除文件
handleFile.deleteFileById = async function  (id) {
	let fileObject = await handleFile.getFileById(id)
	fs.unlink(path.resolve(__dirname, `../uploads/${fileObject.filename}`))
	return File
		.remove({ _id: id })
		.exec()
}
// 获取文件路径
handleFile.getFilePath = async function  (id) {
	let fileObject = await handleFile.getFileById(id)
	return path.join(__dirname, `../uploads/${fileObject.filename}`)
}
module.exports = handleFile