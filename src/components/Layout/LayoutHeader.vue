<template>
  <header class="fixed top-0 inset-x-0 max-w-[1366px] w-full mx-auto bg-base-100 h-16 flex items-center px-5 shadow z-[1000]">
    <!-- logo -->
    <img :src="logoImg" width="101" height="36" alt="光大健康" class="w-[101px] h-9">
    <!-- avatar -->
    <div class="ml-auto dropdown dropdown-end cursor-pointer">
      <div tabindex="0" class="flex items-center space-x-4">
        <img src="https://api.lorem.space/image/face?w=36&h=36" alt="avatar" width="36" height="36" class="w-9 h-9 rounded-full">
        <div class="flex items-center space-x-2.5">
          <h3>老祖</h3>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <ul tabindex="0" class="dropdown-content menu p-1 shadow-lg bg-gray-50 rounded-btn w-40 text-sm">
        <li>
          <div @click="quit">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
            </svg>退出登录
          </div>
        </li>
        </ul>
    </div>
  </header>
</template>

<script setup>
import logoImg from '/src/assets/images/logo.png'
</script>