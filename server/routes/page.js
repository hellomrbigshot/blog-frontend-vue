const express = require('express')
const router = express.Router()

const PageModel = require('../models/page')
const checkLogin = require('../middlewares/check').checkLogin

router.post('/new', checkLogin, async (req, res, next) => {
    try {
        const create_date = new Date()
        const update_date = new Date()
        const title = req.body.title
        const tags = req.body.tags
        const content = req.body.content
        const create_user = req.session.user.username
        const status = req.body.status
        let page = {
            title,
            tags,
            content,
            create_user,
            create_date,
            update_date,
            status
        }
        let result = await PageModel.create(page)
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
    
})
router.post('/edit', checkLogin, async (req, res, next) => {
    try {
        const id = req.query.page_id
        const update_date = new Date()
        const title = req.body.title
        const tags = req.body.tags
        const content = req.body.content
        const status = req.body.status
        let page = {
            title,
            tags,
            content,
            update_date,
            status
        }
        let result = await PageModel.update(id, page)
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
    
})
router.get('/', async (req, res, next) => {
    try {
        const id = req.query.page_id
        let result = await PageModel.getPageById(id)
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})
router.get('/pagelist', async (req, res, next) => {
    try {
        let result = await PageModel.getPageList()
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})
module.exports = router