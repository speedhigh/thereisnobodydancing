<template>
  <div class="relative h-screen bg-[url('/src/assets/images/login/background.svg')] bg-no-repeat bg-cover flex items-center">
    <div 
      class="w-[1200px] h-[700px] bg-base-100 mx-auto rounded-badge px-[4.31rem] py-14 relative"
      style="box-shadow: 0px 0px 59px 7px rgba(255, 67, 42, 0.3)"
    >
      <img :src="loginImg" alt="插画" width="575" height="540" class="absolute top-[22px] left-[70px] w-[575px] h-[540px]">
      <h1 class="text-right">欢迎登录<br>光大健康在线CRM管理系统</h1>
      <div class="ml-auto mr-16 mt-24 w-[21.14rem]">
        <!-- 账号 -->
        <div class="w-full p-2.5 border-b flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <input v-model="form.phone" type="text" placeholder="请输入您的账号" maxlength="11" class="text-lg" @input="changePhone">
        </div>
        <!-- 密码 -->
        <div class="mt-8 w-full p-2.5 border-b flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input v-model="form.password" type="password" placeholder="请输入您的密码" autocomplete="on" class="text-lg">
        </div>
        <!-- btn-登录 -->
        <div class="mt-14 text-center">
          <button
            class="w-[20.71rem] h-[3.73rem] bg-primary text-base-100 text-2xl rounded-badge hover:opacity-70 disabled:opacity-70"
            :disabled="loginDisabled"
            @click="check"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import loginImg from '/src/assets/images/login/illustration.png'
import api from '/src/api/index.js'
import Message from '/src/components/Message/Message.js'
import { checkPhone } from '/src/until/index.js'
import Encrypt from '/src/until/crypto.js'

const router = useRouter()
// 表单绑定
const form = reactive({
  loginType: true,
  captcha: '',
  phone: localStorage.getItem('phone') ? localStorage.getItem('phone') : '',
  password: ''
})
// 节流禁用状态
const loginDisabled = ref(false)
// 输入账号11位时存储
const changePhone = function() {
  if(form.phone.length === 11) {
    localStorage.setItem('phone',form.phone)
  } else {
    if (localStorage.getItem('phone')) { localStorage.removeItem('phone') }
  }
}
// 检查登录信息
const check = function() {
  loginDisabled.value = true
  if(!form.phone || !form.password) {
    Message({ text: '请填写完整信息', type: 'warn' })
    loginDisabled.value = false
    return
  }
  if(!checkPhone(form.phone)) {
    Message({ text: '手机号格式不正确', type: 'warn' })
    loginDisabled.value = false
    return
  }
  let postData = {}
  postData = Object.assign(postData, form)
  postData.password = Encrypt.Encrypt(postData.password)
  login(postData)
}
// 提交登录
const login = function(postData) {
  api.post('/open/login', postData).then((res) => {
    if(res.data.code === 20000) {
      sessionStorage.setItem('token', res.data.data.token)
      sessionStorage.setItem('user', JSON.stringify(res.data.data.user))
      setTimeout(() => loginDisabled.value = false, 100)
      Message({ text: '欢迎你，' + res.data.data.user.name, type: 'success' })
      router.push('/business/stats')
    } else {
      Message({ text: res.data.msg, type: 'warn' })
      loginDisabled.value = false
    }
  })
  // Message({ text: '恭迎老祖', type: 'success' })
  // router.push('/business/stats')
}
</script>