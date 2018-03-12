module.exports = {
	checkLogin (req, res, next) {
		if (!req.session.user) { // 登录超时 前端通过状态码 201 识别
			res.status(201)
			return false
		}
		next()
	},
	checkNotLogin (req, res, next) {
		if (req.session.user) {
			res.status(202)
			return false
		}
		next()
	}
}