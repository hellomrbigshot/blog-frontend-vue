import axios from 'axios'
import qs from 'qs'
import Router from 'vue-router'
import Cookies from 'js-cookie'
export const Common = {
    axios (url, params) {
        params = params || {}
        return axios.post(url, qs.stringify(params)).then(res => {
            if (res.status === 202) {
                Cookies.remove('user')
                Router.push({name: 'login'})
                throw new Error('登录已过期')
            }
            return res
        }).catch(err => {
            
        })
    }
}