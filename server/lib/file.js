const mongoose = require('./mongo')
const Schema = mongoose.Schema

const FileSchema = new Schema({
    originalname: { type: String }, // 原文件名
    filename: { type: String }, // 现文件名
    updatetime: { type: Date, default: Date.now }  // 更新时间
})

exports.File = mongoose.model('File', FileSchema)