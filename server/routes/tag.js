const express = require('express')
const router = express.Router()

const TagModel = require('../models/tag')
const PageModel = require('../models/page')

const checkLogin = require('../middlewares/check').checkLogin
router.post('/taglist', async (req, res, next) => {
    let pageSize =  req.body.pageSize || 10
    let page = req.body.page || 1
    pageSize = typeof(pageSize) === 'number'?pageSize:parseInt(pageSize)
    page = typeof(page) === 'number'?page:parseInt(page)
    try {
        let [total, result] = await Promise.all([
            TagModel.getTagNum(),
            TagModel.getTagList(pageSize, (page-1)*pageSize)
        ])

        result = await Promise.all(result.map(async (single) => {
            single = single.toObject()
            single.page_num = await PageModel.getPageNum({ type: 'tag', content: single.name, status: 'normal', secret: false })
            return single
        }))
        res.status(200).json({ code: 'OK', data: { total, result } })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})
router.post('/tagdetail', async (req, res, next) => {
    let name = req.body.name
    try {
        let result = await TagModel.findTagByName(name)
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

router.post('/alltags', async (req, res, next) => {
    try {
        let result = await TagModel.getAllTags()
        result = result.map(single => {
            return single.name
        })
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})
router.post('/create', checkLogin, async (req, res, next) => {
    const name = req.body.name
    const description = req.body.description
    const create_user = req.session.user.username
    const create_date = new Date()
    const update_date = new Date()
    try {
        let exist = await TagModel.findTagByName(name)
        if (exist) {
            throw new Error('已存在该标签')
        }
        let result = await TagModel.create({ name, description, create_user, create_date, update_date })
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

module.exports = router