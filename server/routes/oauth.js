const router = require('express').Router()
const config = require('../config/config')
const github = require('../config/github')
const weibo = require('../config/weibo')
const fetch = require('node-fetch')
require('url-search-params-polyfill')
const UserModel = require('../models/user')
const checkNotLogin = require('../middlewares/check').checkNotLogin

const HOST = config.HOST
const REGISTER_URL = `${HOST}/register`

// GitHub 授权
router.get('/github', async (req, res, next) => {
    const dataStr = (new Date()).valueOf()
    //  重定向到认证接口,并配置参数
    let path = `https://github.com/login/oauth/authorize?client_id=${github.client_id}&scope=${github.scope}&state=${dataStr}`
    // 转发到授权服务器
    res.redirect(path)
})
router.get('/github/callback', (req, res, next) => {
    const code = req.query.code
    const path = 'https://github.com/login/oauth/access_token'
    const params = {
        client_id: github.client_id,
        client_secret: github.client_secret,
        code: code
    }
    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(result => {
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
                if (req.session.user) {
                    // 已登录，绑定 github
                    UserModel.insertUserOauth({ username: req.session.user.username, type: 'github', name: github_info.login, avatar_url: github_info.avatar_url })
                        .then(user => {
                            if (user) {
                                res.redirect(`${HOST}/normal/user/${req.session.user.username}`) // 跳转到用户详情页
                            }
                        })
                } else {
                    // 没登录，登录或者注册
                    UserModel.getUserByOauthInfo({ type: 'github', name: github_info.login }).then(user => {
                        if (user) {
                            // 已注册，获取登录信息后直接跳转到列表页
                            user = user.toObject()
                            delete user.password
                            req.session.user = JSON.parse(JSON.stringify(user))
                            res.redirect(`${HOST}?oauthtype=github&username=${user.username}`) // 跳转到首页
                        } else {
                            // 如果没有注册，就跳转到注册界面
                            res.redirect(`${REGISTER_URL}?name=${github_info.login}&type=github&avatar_url=${github_info.avatar_url}&bio=${github_info.bio}`)
                        }
                    })
                }
            })

    })
})
// Weibo 授权
router.get('/weibo', async (req, res, next) => {
    const dataStr = (new Date()).valueOf()
    //  重定向到认证接口,并配置参数
    let path = `https://api.weibo.com/oauth2/authorize?client_id=${weibo.client_id}&redirect_uri=${HOST}/api/oauth/weibo/callback&state=${dataStr}`
    // 转发到授权服务器
    res.redirect(path)
})
router.get('/weibo/callback', (req, res, next) => {
    const code = req.query.code
    const path = 'https://api.weibo.com/oauth2/access_token'
    const params = new URLSearchParams();
    params.append('client_id', weibo.client_id);
    params.append('client_secret', weibo.client_secret);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', `${HOST}/api/oauth/weibo/callback`);
    console.log(params)
    fetch(path, {
        method: 'POST',
        body: params
    }).then(weibo_res => {
        console.log(weibo_res)
    })
})
module.exports = router