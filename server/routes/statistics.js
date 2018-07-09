const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const PageModel = require('../models/page')
const checkLogin = require('../middlewares/check').checkLogin
router.post('/', checkLogin, async (req, res, next) => {
    try {
        const [userNum, pageNum] = await Promise.all([UserModel.getUserNum(), PageModel.getPageNum({ status: 'normal' })])
        let data = { userNum, pageNum }
        res.status(200).json({code: 'OK', data: data})
    } catch (e) {
        res.status(200).json({code: 'ERROR', data: e})
    }
   
})
module.exports = router