<template>
  <header class="fixed top-0 inset-x-0 max-w-[1366px] w-full mx-auto bg-base-100 h-16 flex items-center px-5 shadow z-[999]">
    <!-- logo -->
    <img :src="logoImg" width="101" height="36" alt="光大健康" class="w-[101px] h-9">
    <!-- avatar -->
    <div class="ml-auto cursor-pointer relative">
      <div 
        class="flex items-center space-x-4"
        @click="showMenu = !showMenu"
      >
        <div  class="w-9 h-9 rounded-badge bg-gray-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="flex items-center">
          <h3>{{ user.name }}</h3>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'transition duration-200 rotate-180' : showMenu}" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <ul
        v-show="showMenu"
        class="absolute mt-3 -right-4 menu p-0.5 shadow-lg bg-gray-50 rounded-btn w-36 text-sm"
      >
        <li>
          <div @click="showMenu = false; $router.push('/user/information')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>修改密码
          </div>
        </li>
        <li>
          <div @click="quit">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>退出登录
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import logoImg from '/src/assets/images/logo.png'
import { useRouter, useRoute } from 'vue-router'
import Dialog from '/src/components/Dialog/Dialog.js'
import Message from '/src/components/Message/Message.js'

const router = useRouter()
const route = useRoute()
const showMenu = ref(false)
const user = JSON.parse(sessionStorage.getItem('user'))
// 退出登录
const quit = function() {
  showMenu.value = false
  Dialog({ text: '您确定要退出登录吗？' }).then(() => {
    sessionStorage.removeItem('token')
    router.replace('/login')
    Message({ text: '您已成功退出登录', type: 'success' })
  })
}
watch(() => route.path, value => {
  if(showMenu.value) showMenu.value = false
})
</script>