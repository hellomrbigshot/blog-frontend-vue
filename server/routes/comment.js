const express = require('express')
const router = express.Router()

const CommentModel = require('../models/comment')
const checkLogin = require('../middlewares/check').checkLogin

// 创建评论
router.post('/create', checkLogin, async (req, res, next) => {
    const content = req.body.content
    const create_user = req.body.create_user
    const pageid = req.body.page_id
    const page_title = req.body.page_title
    try {
        let result = await CommentModel.create({ content, create_user, pageid, page_title })
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

// 获取文章评论列表
router.post('/getpagecommentlist', async (req, res, next) => {
    const pageid = req.body.page_id
    try {
        let result = await CommentModel.getCommentList('page', pageid)
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

// 获取用户评论列表
router.post('/getusercommentlist', async (req, res, next) => {
    const type = req.body.type
    const create_user = req.body.create_user
    const to_user = req.body.to_user
    try {
        let result = await CommentModel.getCommentList(type, type === 'create_user' ? create_user : to_user)
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

module.exports = router
