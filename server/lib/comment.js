const mongoose = require('./mongo')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: { type: String }, // 评论内容
    createuser: { type: String }, // 创建人
    pageid: { type: String }, // 关联文章
    creattime: { type: Date, default: Date.now }, // 创建时间
    isread: { type: Boolean }, // 是否已读 

})

exports.Comment = mongoose.model('Comment', CommentSchema)