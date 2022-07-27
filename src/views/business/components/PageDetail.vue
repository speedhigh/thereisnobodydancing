<template>
  <main class="space-y-5">

    <!--  section 返回上一页 -->
    <section class="w-full h-10 rounded-box shadow bg-base-100 px-5 cursor-pointer" @click="$router.go(-1)">
      <h3 class="leading-10 font-bold">&lt; 返回上一页</h3>
    </section>

    <!-- section  业务详情 -->
    <section class="w-full rounded-box shadow bg-base-100 p-5">
      <div class="flex items-center space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">业务详情</h2>
      </div>
      <div class="flex items-center flex-wrap px-4">
        <p class="mt-6 mr-10 text-gray-500"><span class="text-primary">*</span>链接所属人：{{ message.saleMain.doctorname }}</p>
        <p class="mt-6 mr-10 text-gray-500"><span class="text-primary">*</span>链接分享人：{{ message.saleMain.salename }}</p>
        <p class="mt-6 mr-10 text-gray-500"><span class="text-primary">*</span>分享产品编码：{{ message.saleMain.skunum }}</p>
        <div class="mt-6 mr-10 text-gray-500 flex items-center w-full">
          <p class="flex-shrink-0"><span class="text-primary">*</span>产品链接：</p>
          <input
            ref="inputCopy" 
            v-model="message.saleMain.href" 
            type="text"
            class="w-full h-full flex-shrink-0 text-sm"
            readonly
          >
        </div>
        <p v-if="message.addressdetail" class="mt-6 mr-10 text-gray-500"><span class="text-primary">*</span>地址：{{ message.addressdetail }}</p>
        <p class="mt-6 mr-10 text-gray-500">
          <span class="text-primary">*</span>申请产品状态：
          <span :class="message.saleMain.state === 1 ? 'text-error' : 'text-success'">{{ message.saleMain.state === 1 ? '未付款' : '已付款' }}</span>
        </p>
      </div>
      <div class="mt-7 flex items-center space-x-5 px-4">
        <button class="w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70" @click="copy">点击复制链接</button>
        <button class="w-40 h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70">点击保存产品二维码</button>
      </div>
    </section>

    <!-- section  分享产品信息 -->
    <section 
      v-if="showPro"
      class="w-full rounded-box shadow bg-base-100 pt-5 px-5 pb-8"
    >
      <div class="flex items-center space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">分享产品信息</h2>
      </div>
      <div class="mt-7 flex space-x-[1.31rem]">
        <img 
          :src="message.productMain.thumbnail" 
          :alt="message.productMain.name" 
          width="140" 
          height="140" 
          class="w-[8.75rem] h-[8.75rem] rounded-btn shadow flex-shrink-0"
        >
        <div class="flex-grow pt-0.5 pb-2">
          <h3 class="text-2xl font-bold">{{ message.productMain.name }}</h3>
          <p class="mt-8 text-3xl text-primary font-bold"><span class="text-base">￥</span>{{ message.productMain.price }}</p>
          <p class="mt-4">购买产品链接：<a :href="message.productMain.buyhref" class="text-info cursor-pointer">{{ message.productMain.buyhref }}</a></p>
        </div>
      </div>
      <div class="mt-10 space-y-4">
        <h3 class="text-xl font-bold">产品简介</h3>
        <img :src="message.productMain.content" :alt="message.productMain.name">
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '/src/api/index.js'
import Message from '/src/components/Message/Message.js'

const route = useRoute()
// 获取数据
const message = ref({
  productMain: {},
  saleMain: {}
})
api.get('/salemain/get', { id: route.params.id }).then((res) => {
  Object.assign(message.value, res.data.data)
})

const showPro = computed(() => {
  if(!message.value.productMain) return false
  if(message.value.productMain) return Object.keys(message.value.productMain).length > 0
})

// 复制链接
const inputCopy = ref()
const copy = function() {
  inputCopy.value.select()
  document.execCommand('copy')
  Message({ text: '已成功复制链接，快去分享给你的客户吧！', type: 'success' })
}
</script>