import axios from 'axios'
import { Message } from 'iview'
import qs from 'qs'
import {router} from '@/router/index'
import Cookies from 'js-cookie'

let timer = null
let loadingArr = []
String.prototype.splice = function (index, str) {
    return `${this.slice(0, index)}${str}${this.slice(index)}`
}
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
// 不足 10 自动补 0
function format (num = 0) {
    const result = num < 10 ? `0${num}` : `${num}`
    return result
}
function type3 (t) {
    let nowTime = new Date().getTime(),
        time = new Date(t).getTime()
    if (nowTime - time < 60*1000) {
        // return  `${Math.floor((nowTime-time)/(1000))} 秒钟前`
        return '刚刚'
    } else if (nowTime - time < 60*60*1000) {
        return  `${Math.floor((nowTime-time)/(60*1000))} 分钟前`
    } else if (nowTime - time < 24*60*60*1000) {
        return `${Math.floor((nowTime-time)/(60*60*1000))} 小时前`
    } else if (nowTime - time < 7*24*60*60*1000) {
        return `${Math.floor((nowTime-time)/(24*60*60*1000))} 天前`
    } else if (new Date().getFullYear() === new Date(t).getFullYear()) {
        return `${format(new Date(t).getMonth()+1)}月${format(new Date(t).getDate())}日`
    } else {
        return `${ new Date(t).getFullYear() }-${ format(new Date(t).getMonth()+1) }-${ format(new Date(t).getDate()) }`
    }
}

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
    },
    formatTime (time, type = '1') {
        let str = ''
        switch (type) {
            // yyyy-mm-dd hh:MM:ss
            case '1': 
                time = new Date(time)
                str = `${ time.getFullYear() }-${ format(time.getMonth()+1) }-${ format(time.getDate()) } ${ format(time.getHours()) }:${ format(time.getMinutes()) }:${ format(time.getSeconds()) }`
                break
            // yyyy-mm-dd
            case '2':
                let date = new Date(time)
                str = `${ time.getFullYear() }-${ format(time.getMonth()+1) }-${ format(time.getDate()) }`
                break
            // 倒计时
            case '3':
                str = type3(time)
                break
        }
        return str
    },
    /***
     * @params {string} type normal 匀速 slower 渐慢
     * @params {number} speed 速度 匀速时必填 
     *  */
    bodyScrollTop (type = 'slower', speed = -50) {  // 滚动到顶端
        let timer = setInterval(() => {
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          speed = (type === 'slower' && Math.floor(-scrollTop/4) || (speed < 0 && speed || 0 - speed))
          document.documentElement.scrollTop = scrollTop + speed
          if (scrollTop === 0) {
              clearInterval(timer)
          }
        }, 30)
      }
}