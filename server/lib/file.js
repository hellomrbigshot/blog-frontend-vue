const mongoose = require('./mongo')
const Schema = mongoose.Schema

const FileSchema = new Schema({
    filename: { type: String }, // 现文件名
    username: { type: String }, // 上传人
    updatetime: { type: Date, default: Date.now }  // 更新时间
})

exports.File = mongoose.model('File', FileSchema)