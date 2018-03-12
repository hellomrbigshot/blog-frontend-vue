const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// POST /signup 用户登录
router.post('/', checkNotLogin, (req, res, next) => {
	const username = req.body.username
	const password = req.body.password

	UserModel.getUserByName(username).then(user => {
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
		req.session.user = user
		// 返回登录成功
		res.status(200).json({code: 'OK', data: '登陆成功'})
	})
	.catch(e => {
		res.status(200).json({code: 'ERROR', data: e})
	})
})

module.exports = router