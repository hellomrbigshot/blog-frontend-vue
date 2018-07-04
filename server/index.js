const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes')
const history = require('connect-history-api-fallback')
const path = require('path')
const favicon = require('serve-favicon')

const app = new express()

app.use(history({
	rewrites: [
	  {
		from: /^\/api\/.*$/,
		to: function(context) {
			return context.parsedUrl.path
		}
	  }
	]
  }))

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../dist')))
app.use(favicon(path.join(__dirname, './favicon.ico')))

// app.get('/uploads/*', (req, res) => {
// 	console.log(req.url)
//     // res.sendFile( __dirname + "/uploads" + req.url )
//     // console.log("Request for " + req.url + " received.");
// })

const sessionStore = new session.MemoryStore({ reapInterval: 3600 * 1000 })
app.use(session({
	secret: 'Stefanie Sun',
	store: sessionStore,
	resave: true, // 强制更新 session
	saveUninitialized: true,  // 
	cookie: { 
		maxAge: 8 * 3600 * 1000,  // 过期时 8 小时
		secure: false // http 访问时 secure 为 false
  }, 
	rolling: true
}))

routes(app)



app.listen('4500', () => console.log('running'))