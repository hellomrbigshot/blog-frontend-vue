module.exports = {
	checkLogin (req, res, next) {
		if (!req.session.user) { // 登录超时 前端通过状态码 401 识别
			// console.log(req.session.user)
			res.status(401).json({ code: 'error', data: '该用户未登录' })
			return false
		}
		next()
	},
	checkNotLogin (req, res, next) {
		if (req.session.user) {
			// console.log(req.session.user)
			res.status(402).json({ code: 'error', data: '该用户已登录' })
			return false
		}
		next()
	}
}
