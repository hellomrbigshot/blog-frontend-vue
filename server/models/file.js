const File = require('../lib/file').File
const express = require('express')
const path = require('path')
const fs = require('fs')


const router = express.Router()
const uploads = router.get('../uploads')
let handleFile = {
	// 上传一个文件
	create (file) {
		return File.create(file)
	},
	// 通过 id 获取文件信息
	getFileByName (filename) {
		return File
			.findOne({ filename })
			// .addCreatedAt()
			.exec()
	},
}
// 通过 id 删除文件
handleFile.deleteFileByName = async function  (filename) {
	fs.unlink(path.resolve(__dirname, `../uploads/${filename}`))
	return File
		.remove({ filename })
		.exec()
}
// 获取文件路径
handleFile.getFilePath = async function (filename) {
	if (!filename) {
		return false
	}
	let result = await handleFile.getFileByName(filename)

	if (result) {
		return path.join(__dirname, `../uploads/${filename}`)
	} else {
		return false
	}
}
module.exports = handleFile