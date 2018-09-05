import axios from 'axios'
import { Message } from 'iview'
import qs from 'qs'
import {router} from '@/router/index'
import Cookies from 'js-cookie'

let timer = null;
let loadingArr = [];
// 添加 loading
axios.interceptors.request.use(config => {
    if (!loadingArr.length) {
        timer = setTimeout(() => {  // 添加延时函数，如果接口请求很快就不出现 loading
            Message.loading({
                content: 'Loading...',
                duration: 0
            })
        }, 300)
    }
    loadingArr.length ++ 
    return config
},
error => {
    console.log(error)
    return Promise.reject(error)
})

// axios 拦截器 未登录则跳转到登录页
axios.interceptors.response.use(res => {
    loadingArr.pop()
    if (timer) {
        clearTimeout(timer)
        timer = null
    }
    if (!loadingArr.length) {
        if (Message) Message.destroy()    
    }

    if (res.data.code === 'OK') {
        return res
    } else {
        Message.error(res.data.data)
        return Promise.reject(res.data)
    }    
},
error => {
    loadingArr.pop()
    if (!loadingArr.length) {
        if (Message) Message.destroy()    
    }
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
    console.log(error)
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