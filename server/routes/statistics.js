const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const checkLogin = require('../middlewares/check').checkLogin
router.post('/', checkLogin, async (req, res, next) => {
    try {
        let data = {}
        data.userNum = await UserModel.getUserNum()
        res.status(200).json({code: 'OK', data: data})
    } catch (e) {
        res.status(200).json({code: 'ERROR', data: e})
    }
   
})
module.exports = router