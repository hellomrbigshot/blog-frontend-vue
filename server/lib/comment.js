const mongoose = require('./mongo')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: { type: String }, // 评论内容
    createuser: { type: String }, // 评论发起人
    pageid: { type: String }, // 关联文章
    pagetitle: { type: String }, // 关联文章标题
    createtime: { type: Date, default: Date.now }, // 创建时间
    isread: { type: Boolean, default: false }, // 是否已读 
    touser: { type: String, default: '' }, // 评论对象
})

exports.Comment = mongoose.model('Comment', CommentSchema)