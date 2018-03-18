module.exports = {
	checkLogin (req, res, next) {
		if (!req.session.user) { // 登录超时 前端通过状态码 201 识别
			res.status(201).json({ code: 'error', data: '该用户未登录' })
			return false
		}
		next()
	},
	checkNotLogin (req, res, next) {
		if (req.session.user) {
			res.status(202).json({ code: 'error', data: '该用户已登录' })
			return false
		}
		next()
	}
}