const router = require('express').Router()
const FileModel = require('../models/files')
const checkLogin = require('../middlewares/check').checkLogin

// post /signup/uploadAvatar 上传头像
router.post('/uploadAvatar', checkLogin, (req, res, next) => {
    const imgData = req.body.imgData
    const user = req.body.username
    // 过滤data:URL
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "")
    const dataBuffer = new Buffer(base64Data, 'base64')
    const timeStamp = new Date().getTime()
    fs.writeFile(`../uploads/${timeStamp}.png`, dataBuffer, err => {
        if (err) {
            
        } else {
            res.send("保存成功！");
        }
    });
})