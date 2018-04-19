const express = require('express')
const sha1 = require('sha1')
const router = express.Router()

const UserModel = require('../models/users')
const FileModel = require('../models/files')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const multer = require('../models/multerUtil')

// post /signup/uploadAvatar 上传头像
router.post('/uploadAvatar', checkNotLogin,  (req, res, next) => {
    const upload = multer.single('file')
    upload(req, res, err => {
        if (err) {
            res.status(200).json({code: 'ERROR', data: err})
            return false
        } 
        const filename = req.file.filename
        const originalname = req.file.originalname
        let file = {
            filename,
            originalname
        }
        FileModel.create(file)
            .then(result => {
                file = result
                res.status(200).json({code: 'OK', data: file.id})
            }).catch(e => {
                // 保存失败
                res.status(200).json({code: 'ERROR', data: e})
            })
    })
})

// POST /signup 用户注册
router.post('/', checkNotLogin, async (req, res, next) => {
    const username = req.body.username
    let password = req.body.password
    const repassword = req.body.repassword
    const avatar = req.body.avatar
    const gender = req.body.gender
    const bio = req.body.bio
    // 校验参数
    try {
        if (!(username.length > 1 && username.length < 10)) {
            throw new Error('用户名请限制在1到10个字符')
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别选择错误')
        }
        if (password.length < 6) {
            throw new Error('密码至少为6个字符')
        }
        if (password !== repassword) {
            throw new Error('两次密码输入不一致')
        }
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
        return false
    }
    try {
        let exist = await UserModel.getUserByName(username)
        if (exist) {
            throw new Error('该用户已注册')
            return false
        }
        // 密码加密
        password = sha1(password)

        // 待写入数据库的用户信息
        let user = {
            username,
            password,
            avatar,
            gender,
            bio
        }

        // 用户信息写入数据库
        let result = JSON.parse(JSON.stringify(await UserModel.create(user)))
        delete result.password
        req.session.user = result
        result.avatar_url = await FileModel.getFilePath(user.avatar)
        res.status(200).json({code: 'OK', data: user})
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
        return false
    }
    
})

module.exports = router