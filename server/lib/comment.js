const mongoose = require('./mongo')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: { type: String }, // 评论内容
    create_user: { type: String }, // 评论发起人
    page_id: { type: String }, // 关联文章
    page_title: { type: String }, // 关联文章标题
    create_time: { type: Date, default: Date.now }, // 创建时间
    is_read: { type: Boolean, default: false }, // 是否已读 
    to_user: { type: String, default: '' }, // 评论对象
})

exports.Comment = mongoose.model('Comment', CommentSchema)