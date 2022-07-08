<template>
  <main class="space-y-5">

    <!-- section 个人信息 -->
    <section class="w-full h-[11.25rem] rounded-box shadow bg-base-100 p-10 flex items-center">
      <!-- avatar -->
      <div  class="w-[6.25rem] h-[6.25rem] rounded-full flex-shrink-0 bg-gray-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-[1.88rem] space-y-6">
        <p class="text-2xl font-bold">{{ user.name }}</p>
        <p class="text-lg text-gray-500">手机号：{{ user.mobile }}</p>
      </div>
      <button 
        class="ml-auto w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70"
        @click="quit"
      >
        退出登录
      </button>
    </section>

    <!-- section  统计 -->
    <base-stat />

    <!-- section 修改密码 -->
    <section class="w-full h-[410px] rounded-box shadow bg-base-100 px-5 pt-5 pb-8">
      <div class="flex items-center space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">修改密码</h2>
      </div>
      <div class="px-4">
        <!-- 手机号 -->
        <div class="mt-[1.88rem] flex items-center space-x-5">
          <p class="text-gray-500"><span class="text-primary">*</span>手机号</p>
          <input v-model="form.mobile" readonly type="tel" placeholder="请输入手机号码" maxlength="11" class="input w-[18.75rem] bg-base-200 h-10" />
        </div>
        <!-- 验证码 -->
        <div class="mt-[1.88rem] flex items-center space-x-5">
          <p class="text-gray-500"><span class="text-primary">*</span>验证码</p>
          <input v-model="form.captcha" type="number" placeholder="请输入验证码" class="input w-40 bg-base-200 h-10" />
          <button
            :disabled="captcha.disabled"
            class="w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70 disabled:opacity-70"
            @click="getCaptcha"
          >
            {{ captcha.text }}
          </button>
        </div>
        <!-- 新密码 -->
        <div class="mt-[1.88rem] flex items-center space-x-5">
          <p class="text-gray-500"><span class="text-primary">*</span>新密码</p>
          <form action="">
            <input v-model="form.password" type="password" placeholder="请输入新密码" class="input w-[18.75rem] bg-base-200 h-10" />
          </form>
        </div>
        <!-- 新密码 -->
        <div class="mt-[1.88rem] flex items-center space-x-5">
          <p class="text-gray-500"><span class="text-primary">*</span>新密码</p>
          <form action="">
            <input v-model="form.password2" type="password" placeholder="请再次确认新密码" class="input w-[18.75rem] bg-base-200 h-10" />
          </form>
        </div>
        <!-- 立即修改 -->
        <button 
          class="mt-5 w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70 disabled:opacity-70"
          :disabled="btnDisabled"
          @click="submit"
        >
          立即修改
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from '/src/api/index.js'
import Encrypt from '/src/until/crypto.js'
import Dialog from '/src/components/Dialog/Dialog.js'
import Message from '/src/components/Message/Message.js'
import { useRouter } from 'vue-router'
import BaseStat from '/src/components/BaseStat.vue'

const router = useRouter()
const user = JSON.parse(sessionStorage.getItem('user'))
const quit = function() {
  Dialog({ text: '您确定要退出登录吗？' }).then(() => {
    sessionStorage.removeItem('token')
    router.replace('/login')
    Message({ text: '您已成功退出登录', type: 'success' })
  })
}

// 修改密码
const form = reactive({
  mobile: localStorage.getItem('phone'),
  captcha: '',
  password: '',
  password2: ''
})
// 验证码
const captcha = reactive({
  text: '获取验证码',
  disabled: false
})
const getCaptcha = function() {
  captcha.disabled = true
  let i = 30
  captcha.text = i + 's'
  let timer = setInterval(() => {
    i -= 1
    captcha.text = i + 's'
    if(i === 0) {
      captcha.text = '发送验证码'
      captcha.disabled = false
      clearInterval(timer)
    }
  },1000)
  api.get('/open/sendcaptcha', { phone: form.mobile }).then((res) => {
    if(res.data.code !== 20000) Message({ text: '发送失败，请重新获取验证码' })
  })
}

// 立即修改
const btnDisabled = ref(false)
const submit = function() {
  btnDisabled.value = true
  if(!form.mobile || !form.captcha || !form.password || !form.password2) {
    Message({ text: '请填写完整信息' })
    btnDisabled.value = false
    return
  }
  if(form.password !== form.password2) {
    Message({ text: '两次输入密码不一致' })
    btnDisabled.value = false
    return
  }
  let postData = {
    mobile: form.mobile,
    captcha: form.captcha,
    password: Encrypt.Encrypt(form.password)
  }
  changePassword(postData)
}
const changePassword = function(postData){
  api.get('/open/resetpassword', postData).then((res) => {
    if(res.data.code !== 20000) {
      Message({ text: res.data.msg})
      setTimeout(() => btnDisabled.value = false, 200)
    } else {
      Message({ text: '修改成功！', type: 'success' })
      btnDisabled.value = false
      setTimeout(() => {
        sessionStorage.removeItem('token')
        router.replace('/login')
      }, 1000)
    }
  })
}
</script>