<template>
  <main class="space-y-5">

    <!--  section 返回上一页 -->
    <section class="w-full h-10 rounded-box shadow bg-base-100 px-5 cursor-pointer" @click="$router.go(-1)">
      <h3 class="leading-10 font-bold">&lt; 返回上一页</h3>
    </section>

    <!-- section  业务详情 -->
    <section class="w-full h-[13.75rem] rounded-box shadow bg-base-100 p-5">
      <div class="flex items-center space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">业务详情</h2>
      </div>
      <div class="flex items-center flex-wrap px-4">
        <p class="mt-6 mr-10 text-gray-500"><span class="text-primary">*</span>链接所属人：{{ message.saleMain.doctorname }}</p>
        <p class="mt-6 mr-10 text-gray-500"><span class="text-primary">*</span>链接分享人：{{ message.saleMain.salename }}</p>
        <p class="mt-6 mr-10 text-gray-500"><span class="text-primary">*</span>分享产品编码：{{ message.saleMain.skunum }}</p>
        <p class="mt-6 mr-10 text-gray-500"><span class="text-primary">*</span>产品链接：{{ message.saleMain.href }}</p>
        <p class="mt-6 mr-10 text-gray-500">
          <span class="text-primary">*</span>申请产品状态：
          <span :class="message.saleMain.state === 1 ? 'text-error' : 'text-success'">{{ message.saleMain.state === 1 ? '未分享' : '已分享' }}</span>
        </p>
      </div>
      <div class="mt-7 flex items-center space-x-5 px-4">
        <button class="w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70">点击复制链接</button>
        <button class="w-40 h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70">点击保存产品二维码</button>
      </div>
    </section>

    <!-- section  分享产品信息 -->
    <section 
      v-if="message.productMain"
      class="w-full rounded-box shadow bg-base-100 pt-5 px-5 pb-8"
    >
      <div class="flex items-center space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">分享产品信息</h2>
      </div>
      <div class="mt-7 flex space-x-[1.31rem]">
        <img 
          src="https://api.lorem.space/image/burger?w=140&h=140" 
          alt="product" 
          width="140" 
          height="140" 
          class="w-[8.75rem] h-[8.75rem] rounded-btn shadow flex-shrink-0"
        >
        <div class="flex-grow pt-0.5 pb-2">
          <h3 class="text-2xl font-bold">莫林加100% 健康食品</h3>
          <p class="mt-8 text-3xl text-primary font-bold"><span class="text-base">￥</span>6660.41</p>
          <p class="mt-4">购买产品链接：<span class="text-info cursor-pointer">http.guangdajiankang.com</span></p>
        </div>
      </div>
      <div class="mt-10">
        <h3 class="text-xl font-bold">产品简介</h3>
        <p class="mt-7 text-base text-gray-500">
          莫林加是芥末科的落叶小乔木。种子炒着吃，味道像花生。果实可以烹饪（做成比克斯），叶子和花和树枝一样作为香味蔬菜食用。
        </p>
        <p class="mt-5 text-base text-gray-500">
          作为香辛料使用。因为根有香味，所以也被称为“山葵”，是和芥末（山葵）完全不同的植物。一般认为，“对减肥有好处”贫血治愈“母奶的流出
          变好”“有抗菌作用”等
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '/src/api/index.js'
const route = useRoute()

const message = ref({
  productMain: {},
  saleMain: {}
})
api.get('/salemain/get', { id: route.params.id }).then((res) => {
  Object.assign(message.value, res.data.data)
})
</script>