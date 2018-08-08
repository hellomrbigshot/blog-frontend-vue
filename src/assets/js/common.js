import axios from 'axios'
import qs from 'qs'
import {router} from '@/router/index'
import Cookies from 'js-cookie'
import { Message } from 'iview'

// axios 拦截器 未登录则跳转到登录页
axios.interceptors.response.use(
    res => {
        if (res.data.code === 'OK') {
            return res
        } else {
            Message.error(res.data.data)
            return Promise.reject(res.data)
        }    
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    Cookies.remove('user')
                    localStorage.removeItem('user')
                    router.replace({
                        name: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        return Promise.reject(error.response.data)
    })

export const Common = {
    axios (url, params) {
        params = params || {}
        return axios.post(url, qs.stringify(params))
    },
    dateFmt (fmt, date) {   
        let o = {   
            "M+" : date.getMonth()+1,                 //月份   
            "d+" : date.getDate(),                    //日   
            "h+" : date.getHours(),                   //小时   
            "m+" : date.getMinutes(),                 //分   
            "s+" : date.getSeconds(),                 //秒   
            "q+" : Math.floor((date.getMonth()+3)/3), //季度   
            "S"  : date.getMilliseconds()             //毫秒   
        }   
        if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)) 
        for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))   
        return fmt   
    } 
}