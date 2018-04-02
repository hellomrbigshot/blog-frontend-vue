const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')
const checkLogin = require('../middlewares/check').checkLogin

// POST /signup 用户登录
router.post('/list', checkLogin, (req, res, next) => {
    // 返回登录成功
    let pageSize =  req.body.pageSize
    let page = req.body.page
    pageSize = typeof(pageSize) === 'number'?pageSize:parseInt(pageSize)
    page = typeof(page) === 'number'?page:parseInt(page)
    UserModel.getUserNum().then(num => {
        UserModel.getUserList(pageSize, (page-1)*pageSize).then(userList => {
            let list = userList.map(user => {
                delete user.password
                return user
            })
            res.status(200).json({code: 'OK', data: {list: list, page_num: Math.ceil(num/pageSize)}})
        })
        .catch(e => {
            res.status(200).json({code: 'ERROR', data: e})
        })
    }).catch(e => {
        res.status(200).json({code: 'ERROR', data: e})
    })
    
})

module.exports = router