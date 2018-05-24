const mongoose = require('./mongo')
const Schema = mongoose.Schema

const PageTagMapSchema = new Schema({
    page: { type: String }, // 文章 id
    tag: { type: String }, // 标签 id
    create_user: { type: String }, // 创建人
    create_time: { type: Date }, // 更新时间
    update_time: { type: Date }, // 更新时间
    status: { type: String } // 状态 normal, invalid
})
exports.PageTagMap = mongoose.model('PageTagMap', PageTagMapSchema)