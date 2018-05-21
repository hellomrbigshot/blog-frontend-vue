const express = require('express')
const router = express.Router()

const TagModel = require('../models/tag')
const PageModel = require('../models/page')

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
        res.status(200).json({ code: 'OK', data: {total, result} })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})
router.post('/create', async (req, res, next) => {
    let name = req.body.name
    let description = req.body.description
    try {
        let result = await TagModel.create({ name, description })
        res.status(200).json({ code: 'OK', data: result })
    } catch (e) {
        res.status(200).json({ code: 'ERROR', data: e.message })
    }
})

module.exports = router