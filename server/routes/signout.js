const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// POST /signup 用户登录
router.post('/', checkLogin, (req, res, next) => {
    delete req.session.user
    // 返回登录成功
    res.status(200).json({code: 'OK', data: '登陆成功'})
})

module.exports = router