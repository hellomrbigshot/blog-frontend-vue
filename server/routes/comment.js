const express = require('express')
const router = express.Router()

const CommentModel = require('../models/comment')
const checkLogin = require('../middlewares/check').checkLogin

// 创建评论
router.post('/create', checkLogin, async (req, res, next) => {
    const content = req.body.content
    const create_user = req.body.create_user
    const page_id = req.body.page_id
    const page_title = req.body.page_title
    const to_user = req.body.to_user
    try {
        let result = await CommentModel.create({ content, create_user, page_id, page_title, to_user })
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

// 获取文章评论列表
router.post('/getpagecommentlist', async (req, res, next) => {
    const page_id = req.body.page_id
    try {
        let result = await CommentModel.getCommentList({ type: 'page', content: page_id })
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

// 获取用户评论列表
router.post('/getusercommentlist', checkLogin, async (req, res, next) => {
    const type = req.body.type
    const create_user = req.body.create_user
    const to_user = req.body.to_user
    let pageSize = req.body.pageSize || 10
    let page = req.body.page || 1
    pageSize = typeof pageSize === 'number' ? pageSize : parseInt(pageSize)
    page = typeof page === 'number' ? page : parseInt(page)
    const Count = pageSize * (page - 1)
    const content = type === 'create_user' ? create_user : to_user
    try {
        let [result, total] = await Promise.all([
            CommentModel.getCommentList({ type, content, pageSize, Count }), 
            CommentModel.getCommentNum(type, type === 'create_user' ? create_user : to_user)
        ]) 
        res.status(200).json({ code: 'OK', data: { result, total } })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

module.exports = router
