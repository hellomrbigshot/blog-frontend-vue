const router = require('express').Router()
const config = require('../config/config')
const github = require('../config/github')
const weibo = require('../config/weibo')
const fetch = require('node-fetch')
require('url-search-params-polyfill')
const UserModel = require('../models/user')
const checkNotLogin = require('../middlewares/check').checkNotLogin

const HOST = config.HOST
const REGISTER_URL = `${HOST}/oauthregister`

// GitHub 授权
router.get('/github', (req, res, next) => {
    const dataStr = (new Date()).valueOf()
    //  重定向到认证接口,并配置参数
    let path = `https://github.com/login/oauth/authorize?client_id=${github.client_id}&scope=${github.scope}&state=${dataStr}&redirect_uri=${HOST}/api/oauth/github/callback`
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
        const url = `https://api.github.com/user?access_token=${access_token}`
        fetch(url)
            .then(info => {
                return info.json()
            })
            .then(github_info => {
                oauthAction('github', github_info.login, github_info.avatar_url, github_info.login, req, res)
            })
    })
})

// Weibo 授权
router.get('/weibo', (req, res, next) => {
    const dataStr = (new Date()).valueOf()
    //  重定向到认证接口,并配置参数
    let path = `https://api.weibo.com/oauth2/authorize?client_id=${weibo.client_id}&redirect_uri=${HOST}/api/oauth/weibo/callback&state=${dataStr}`
    // 转发到授权服务器
    res.redirect(path)
})
router.get('/weibo/callback', (req, res, next) => {
    const code = req.query.code
    const path = 'https://api.weibo.com/oauth2/access_token'
    const params = new URLSearchParams()
    params.append('client_id', weibo.client_id)
    params.append('client_secret', weibo.client_secret)
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', `${HOST}/api/oauth/weibo/callback`)
    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    })
    .then(result => result.json())
    .then(weibo_res => {
        const WEIBO_USER_API = `https://api.weibo.com/2/users/show.json`
        fetch(`${WEIBO_USER_API}?access_token=${weibo_res.access_token}&uid=${weibo_res.uid}`)
            .then(info => info.json())
            .then(weibo_info => {
                oauthAction('weibo', weibo_info.name, weibo_info.avatar_large, weibo_info.domain, req, res)
            })
    })
})
/**
 * 统一处理获取到第三方用户信息后的操作
 * 
 * @param {string} type 第三方类型
 * @param {string} name 第三方用户名
 * @param {string} avatar_url 第三方用户头像
 * @param {string} domain 第三方个人主页
 * @param {string} bio 第三方用户描述
 * @param {Object} req  
 * @param {Object} res  
 */
function oauthAction (type, name, avatar_url, domain, req, res) {
    const session_user = req.session.user
    if (session_user) {
        // 已登录，绑定第三方账号
        UserModel.getUserByOauthInfo({ type, name }).then(user => {
            if (user) {
                // 如果已有绑定过的，return false
                res.redirect(`${HOST}/normal/user/${session_user.username}`)
                return false
            }
            UserModel.insertUserOauth({ username: session_user.username, type, name, avatar_url, domain })
                .then(user => {
                    if (user) {
                        res.redirect(`${HOST}/normal/user/${session_user.username}`) // 跳转到用户详情页
                    }
                })
        })  
    } else {
        // 没登录，登录或者注册
        UserModel.getUserByOauthInfo({ type, name }).then(user => {
            if (user) {
                // 已注册，获取登录信息后直接跳转到列表页
                user = user.toObject()
                delete user.password
                req.session.user = JSON.parse(JSON.stringify(user))
                res.redirect(`${HOST}?oauthtype=${type}&username=${user.username}`) // 跳转到首页
            } else {
                // 如果没有注册，就跳转到注册界面
                res.redirect(`${REGISTER_URL}?name=${name}&type=${type}&domain=${domain}&avatar_url=${avatar_url}`)
            }
        })
    }
}
module.exports = router