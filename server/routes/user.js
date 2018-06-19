const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/user')
const checkLogin = require('../middlewares/check').checkLogin

// POST 用户列表
router.post('/list', checkLogin, (req, res, next) => {
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
            res.status(200).json({ code: 'OK', data: { list: list, total_num: num }})
        })
        .catch(e => {
            res.status(200).json({ code: 'ERROR', data: e })
        })
    }).catch(e => {
        res.status(200).json({ code: 'ERROR', data: e })
    })
    
})
// POST 用户详情
router.post('/detail', (req, res, next) => {
    let username = req.body.username
    UserModel.getUserByName(username).then(user => {
        let result = JSON.parse(JSON.stringify(user))
        delete result.password
        res.status(200).json({ code: 'OK', data: result })
    })
    .catch(e => {
        res.status(200).json({ code: 'ERROR', data: e })
    })

})

// POST 获取该用户获得的所有评论
router.post('/receivedcomments', checkLogin, (req, res, next) => {
    let pageSize = req.body.pageSize || 10
    let page = req.body.page || 1
    const type = req.body.type
    const content = req.body.content
    const status = req.body.status
    const secret = req.body.secret
    pageSize = typeof (pageSize) === 'number' ? pageSize : parseInt(pageSize)
    page = typeof (page) === 'number' ? page : parseInt(page)
    try {

        // let [total, result] = await Promise.all([
        //     PageModel.getPageNum(type, content, status, secret),
        //     PageModel.getPageList(type, content, status, pageSize, pageSize * (page - 1), secret)
        // ])
        // res.status(200).json({ code: 'OK', data: { result, total }})
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

module.exports = router