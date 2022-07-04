import axios from 'axios'
import router from '../router'
import Dialog from '/src/components/Dialog/Dialog.js'
const baseURL = import.meta.env.VITE_APP_URL

const http = axios.create({
  baseURL,
  timeout: 20000,
})


// 在发起请求时进行拦截，获取token
http.interceptors.request.use(
  req => {
    req.headers.Authorization = window.sessionStorage.getItem("token")
    return req
  },
  error => {
    return Promise.reject(error)
  }
)

// 当获取服务器返回的信息时进行的处理
http.interceptors.response.use(
  res => {
    if(res.data.code === 20002) {
      if( window.sessionStorage.getItem("token")) {
        window.sessionStorage.removeItem("token")
      }
      Dialog({ text: '登录超时，请重新登录', showCancel: false }).then(() => {
        sessionStorage.removeItem('token')
        router.push('/login')
        location.reload()
      })
    }
    return res
  },
  error => {
    let originalRequest = error.config
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
      // if(router.currentRoute.value.path !== '/'){
      //   Dialog.alert({ message: '请求超时,请重新操作' }).then(() => {
      //     router.push('/')
      //   })        
      // }
    }
    return Promise.reject(error)
  }
)

const api = {}

api.get = function(url, params={}) {
  return new Promise((resolve) => {
    http({ method: "get", url: url, params:params }).then((res)=>{ resolve(res ) })
  })
}

api.post = function(url, params) {
  return new Promise((resolve) => {
    http({ method: "post", url: url, data: params }).then((res) => { resolve(res) })
  })
}

api.put = function(url, params) {
  return new Promise((resolve) => {
    http({ method: "put", url: url, contentType: "application/x-www-form-urlencoded", params: params }).then((res) => { resolve(res) })
  })
}

api.delete = function(url, params) {
  return new Promise((resolve) => {
    http({ method: "delete", url: url, params:params }).then((res) => { resolve(res) })
  })
}

export default api
