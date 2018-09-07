const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/user')
const PageModel = require('../models/page')
const CommentModel = require('../models/comment')
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
		const [page_num, draft_num, comment_num] = await Promise.all([
			PageModel.getPageNum({ type: 'create_user', content: username, status: 'normal' }),
			PageModel.getPageNum({ type: 'create_user', content: username, status: 'draft' }),
			CommentModel.getCommentNum('create_user', username)
		])
		user.page_num = page_num
		user.draft_num = draft_num
		user.comment_num = comment_num

		// 返回登录成功
		res.status(200).json({ code: 'OK', data: user })
	} catch (e) {
		res.status(200).json({ code: 'ERROR', data: e.message })
        return false
	}
	
})


module.exports = router