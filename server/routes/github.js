const router = require('express').Router()
const config = require('../config/config')
const fetch = require('node-fetch')
const UserModel = require('../models/user')
const checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/login', checkNotLogin, async (req, res, next) => {
    const dataStr = (new Date()).valueOf()
    //  重定向到认证接口,并配置参数
    let path = `https://github.com/login/oauth/authorize`
    path += `?client_id=${config.client_id}`
    path += `&scope=${config.scope}`
    path += `&state=${dataStr}`
    // 转发到授权服务器
    res.redirect(path)
})
router.get('/oauth/callback', checkNotLogin, (req, res, next) => {
    const code = req.query.code
    const path = 'https://github.com/login/oauth/access_token'
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }
    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then(result => {
        return result.text()
    }).then(body => {
        let access_token = body.split('&')[0].split('=')[1]
        return access_token
    }).then(token => {
        const url = `https://api.github.com/user?access_token=${token}`
        fetch(url)
            .then(info => {
                return info.json()
            })
            .then(github_info => {
                UserModel.getUserByOauthInfo({ type: 'github', name: github_info.login }).then(user => {
                    if (user) {
                        // 已注册，获取登录信息后直接跳转到列表页
                        user = user.toObject()
                        delete user.password
                        req.session.user = JSON.parse(JSON.stringify(user))
                        res.redirect(`${config.main_url}?username=${user.username}`)
                    } else {
                        // 如果没有注册，就跳转到注册界面
                        res.redirect(`${config.register_url}?name=${github_info.login}&type=github&avatar_url=${github_info.avatar_url}&bio=${github_info.bio}`)
                    }
                })
                
            })

    })
})
module.exports = router