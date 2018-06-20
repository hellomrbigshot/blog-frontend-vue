module.exports = function (app) {
	app.use('/api/signup', require('./signup'))
	app.use('/api/signin', require('./signin'))
	app.use('/api/signout', require('./signout'))
	app.use('/api/user', require('./user'))
	app.use('/api/statistics', require('./statistics'))
	app.use('/api/page', require('./page'))
	app.use('/api/tag', require('./tag'))
	app.use('/api/github', require('./github'))
	app.use('/api/comment', require('./comment'))
}