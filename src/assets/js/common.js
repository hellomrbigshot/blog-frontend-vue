import axios from 'axios'
import qs from 'qs'
import {router} from '@/router/index'
import Cookies from 'js-cookie'

// axios 拦截器 未登录则跳转到登录页
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    Cookies.remove('user')
                    router.replace({
                        name: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export const Common = {
    axios (url, params) {
        params = params || {}
        return axios.post(url, qs.stringify(params))
    }
}