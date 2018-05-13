const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes')
const history = require('connect-history-api-fallback')
const path = require('path')
const favicon = require('serve-favicon')

const app = new express()

// app.use(history())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../dist')))
app.use(favicon(path.join(__dirname, './favicon.ico')))



const sessionStore = new session.MemoryStore({ reapInterval: 3600 * 1000 })
app.use(session({
	secret: 'Stefanie Sun',
	store: sessionStore,
	resave: true, // 强制更新 session
	saveUninitialized: true,  // 
	cookie: { maxAge: 3600 * 1000 }, // 过期时间
	rolling: true
}))


routes(app)



app.listen('80', () => console.log('running'))