const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const PageModel = require('../models/page')
const checkLogin = require('../middlewares/check').checkLogin
router.post('/', checkLogin, async (req, res, next) => {
    try {
        let data = {}
        data.userNum = await UserModel.getUserNum()
        data.pageNum = await PageModel.getPageNum('normal')
        res.status(200).json({code: 'OK', data: data})
    } catch (e) {
        res.status(200).json({code: 'ERROR', data: e})
    }
   
})
module.exports = router