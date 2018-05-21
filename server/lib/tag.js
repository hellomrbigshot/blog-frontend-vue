const mongoose = require('./mongo')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    name: { type: String }, // 名字
    description: { type: String } // 描述
})
exports.Tag = mongoose.model('Tag', TagSchema)