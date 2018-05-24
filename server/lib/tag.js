const mongoose = require('./mongo')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    name: { type: String }, // 名字
    description: { type: String }, // 描述
    create_user: { type: String }, // 创建人
    create_time: { type: Date }, // 创建时间 
    update_time: { type: Date }, // 更新时间 
})
exports.Tag = mongoose.model('Tag', TagSchema)