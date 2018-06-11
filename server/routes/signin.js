const sha1 = require('sha1')
const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const UserModel = require('../models/user')
const PageModel = require('../models/page')
const FileModel = require('../models/files')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin

// POST /signin 用户登录
router.post('/', checkNotLogin, async (req, res, next) => {
	const username = req.body.username
	const password = req.body.password

	try {
		let user = JSON.parse(JSON.stringify(await UserModel.getUserByName(username)))
		if (!user) {
			res.status(200).json({code: 'ERROR', data: '用户不存在'})
			return false
		}
		// 检查密码是否匹配
		if (sha1(password) !== user.password) {
			res.status(200).json({code: 'ERROR', data: '用户名或密码错误'})
			return false
		}
		delete user.password
		req.session.user = JSON.parse(JSON.stringify(user))
		// 返回登录成功
		res.status(200).json({code: 'OK', data: '登录成功'})
	} catch (e) {
		res.status(200).json({ code: 'ERROR', data: e.message })
        return false
	}
	
})
// 根据用户名获取用户信息
router.post('/getUserInfo', checkLogin, async (req, res, next) => {
	const username = req.body.username
	try {
		let user = (await UserModel.getUserByName(username)).toObject()
		delete user.password
		const [page_num, draft_num] = await Promise.all([
			PageModel.getPageNum('create_user', username, 'normal'),
			PageModel.getPageNum('create_user', username, 'draft'),
		])
		user.page_num = page_num
		user.draft_num = draft_num

		// 返回登录成功
		res.status(200).json({code: 'OK', data: user})
	} catch (e) {
		res.status(200).json({ code: 'ERROR', data: e.message })
        return false
	}
	
})

// get /avatar/file_id
router.get('/avatar', (req, res, next) => {
	const id = req.query.file_id
	if (id === 'undefined' || !id) {
		res.status(500).json({ code: 'ERROR' })
	} else {
		res.set('content-type', 'image/jpg')
		FileModel.getFilePath(id).then(url => {
			// res.sendFile(url)
			// fs.readFile(url, 'binary', (err, file) => {
			// 	if (err) {
			// 	  console.log(err)
			// 	  return;
			// 	} else {
			// 		res.writeHead(200, { 'Content-Type': 'image/jpeg' })
			// 		res.write(file, 'binary')
			// 		res.end()
			// 		return
			// 	}
			// })
			let stream = fs.createReadStream(url)
			let responseData = []; // 存储文件流
			if (stream) { // 判断状态
				stream.on('data', chunk => {
					responseData.push(chunk)
				})
				stream.on('end', () => {
					let finalData = Buffer.concat(responseData)
					res.write(finalData)
					res.end()
				})
			}
		})
		
	}
	
})

module.exports = router