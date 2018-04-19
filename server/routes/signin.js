const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const FileModel = require('../models/files')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// POST /signup 用户登录
router.post('/', checkNotLogin, async (req, res, next) => {
	const username = req.body.username
	const password = req.body.password

	try {
		let user = await UserModel.getUserByName(username)
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
		user.avatar_url = FileModel.getFilePath(user.avatar)
		// 返回登录成功
		res.status(200).json({code: 'OK', data: user})
	} catch (e) {
		res.status(200).json({ code: 'ERROR', data: e.message })
        return false
	}
	
})

module.exports = router