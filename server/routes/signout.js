const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

// POST /signup 用户登录
router.post('/', checkLogin, (req, res, next) => {
    delete req.session.user
    // 返回登录成功
    res.status(200).json({code: 'OK', data: '退出成功'})
})

module.exports = router