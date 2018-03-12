module.exports = function (app) {
	app.use('/signup', require('./signup'))
	app.use('/signin', require('./signin'))
	// app.use('/signout', require('./signout'))
}