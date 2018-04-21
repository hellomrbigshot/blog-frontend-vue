const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    // 设置文件上传路径
    destination (req, file, cb) {
        cb(null, path.resolve(__dirname, '../uploads'))
    },
    // 文件重命名
    filename (req, file, cb) {
        let fileType = file.originalname.split('.')[file.originalname.split('.').length-1]
        cb(null, `${file.fieldname}-${Date.now()}.${fileType}`)
    },
})

const upload = multer({
    storage: storage
})

module.exports = upload