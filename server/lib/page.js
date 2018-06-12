const mongoose = require('./mongo')
const Schema = mongoose.Schema

const PageSchema = new Schema({
    title: { type: String }, // 标题
    tags: { type: Array }, // 标签
    create_user: { type: String }, // 创建人
    create_date: { type: Date }, // 新建时间
    update_date: { type: Date }, // 更新时间
    content: { type: String }, // 更新时间
    status: { type: String, enum: ['draft', 'normal', 'cancel'] }, // 状态，包括 草稿，正常，删除
    secret: { type: Boolean }, // 是否为私密，保存为草稿时这个选项没有实际意义
    tags: { type: Array }, // 标签
    comments: { type: Array } // 评论
})

exports.Page = mongoose.model('Page', PageSchema)