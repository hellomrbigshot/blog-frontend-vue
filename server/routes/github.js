const router = require('express').Router()
const config = require('../config/config')
const fetch = require('node-fetch')
const UserModel = require('../models/user')

router.get('/login', async (req, res) => {
    const dataStr = (new Date()).valueOf()
    //  重定向到认证接口,并配置参数
    let path = "https://github.com/login/oauth/authorize"
    path += '?client_id=' + config.client_id
    path += '&scope=' + config.scope
    path += '&state=' + dataStr
    // 转发到授权服务器
    res.redirect(path)
})
router.get('/oauth/callback', async (req, res, next) => {
    const code = req.query.code;
    let path = 'https://github.com/login/oauth/access_token';
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }
    await fetch(path, {
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
    }).then(async (token) => {
        const url = ' https://api.github.com/user?access_token=' + token;
        await fetch(url)
            .then(result1 => {
                return result1.json();
            })
            .then(async (result2) => {
                let exist = await UserModel.getUserByOauthInfo({ type: 'github', name: result2.login })
                if (exist) {
                    // 果然已经注册了，获取登录信息后直接跳转到列表页
                    req.session.user = JSON.parse(JSON.stringify(exist))
                    res.redirect(`${config.main_url}?username=${exist.username}`)
                } else {
                    // 如果没有注册，就先注册
                }
                res.redirect(`${config.register_url}?name=${result2.name}`)
                // res1.status(200).json({ code: 'OK', data: res })
            })

    })
})
module.exports = router