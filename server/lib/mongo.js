const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/VueExpressBlog'

mongoose.connect(DB_URL, {useMongoClient:true})
mongoose.Promise = require('bluebird')
/**
  * 连接成功
  */
mongoose.connection.on('connected', () => {
	console.log(`Mongoose connection open to${DB_URL}`)
})

/**
  * 连接失败
  */
 mongoose.connection.on('error', err => {
 	console.log(`Mongoose connection error: ${err}`)
 })

 module.exports = mongoose
