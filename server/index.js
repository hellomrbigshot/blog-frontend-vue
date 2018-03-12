const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = new express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
	secret: 'express_session',
	resave: true, // 强制更新 session
	saveUninitialized: true,  // 
	cookie: { maxAge: 60 * 1000 * 30} // 过期时间
}))


routes(app)



app.listen('4500', () => console.log('running'))