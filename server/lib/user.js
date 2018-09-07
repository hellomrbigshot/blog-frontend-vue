const mongoose = require('./mongo')
const Schema = mongoose.Schema
const createAt = require('./createAt')

const UserSchema = new Schema({
	username: { type: String },  // 用户账户
	password: { type: String },   // 用户密码
	avatar: { type: String },   // 头像
	gender: { type: String, enum: ['m', 'f', 'x'] },  // 性别
	bio: { type: String }, // 个人简介
	oauthinfo: { type: Array }, // 第三方登录信息
	logindate: { type: Date }    // 最近登陆时间
})
// UserSchema.plugin(createAt, { index: true })
exports.User = mongoose.model('User', UserSchema)
// exports.User.index({ name: 1 }, { unique: true }).exec() // 创建以name键为升序排列的唯一索引


