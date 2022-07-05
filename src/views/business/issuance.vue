<template>
  <main class="space-y-5">
    <!-- section  生成产品链接 -->
    <section class="w-full bg-base-100 rounded-box shadow p-5 h-64">
      <div class="flex space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2>生成产品链接</h2>
      </div>
      <div class="px-4">
        <!-- 产品类型 -->
        <div class="mt-[1.88rem] flex items-center space-x-5">
          <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>产品类型</p>
          <!-- a -->
          <div class="w-[7.63rem] h-[4.81rem] rounded-btn shadow">
            <img src="https://api.lorem.space/image/pizza?w=122&h=77" alt="产品类型" width="122" height="77" class="w-full h-full rounded-btn">
          </div>
          <!-- b -->
          <div class="w-[7.63rem] h-[4.81rem] rounded-btn shadow">
            <img src="https://api.lorem.space/image/burger?w=122&h=77" alt="产品类型" width="122" height="77" class="w-full h-full rounded-btn">
          </div>
          <!-- c -->
          <div class="w-[7.63rem] h-[4.81rem] rounded-btn shadow">
            <img src="https://api.lorem.space/image/drink?w=122&h=77" alt="产品类型" width="122" height="77" class="w-full h-full rounded-btn">
          </div>
        </div>
        <div class="mt-[1.88rem] flex items-center space-x-10">
          <!-- 链接生成 -->
          <div class="flex items-center space-x-5">
            <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>链接生成</p>
            <input type="text" placeholder="请输入链接" class="input w-72 bg-base-200 h-10" />
          </div>
          <!-- 申请人 -->
          <div class="flex items-center space-x-5">
            <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>申请人</p>
            <input type="text" placeholder="请输入申请人姓名" class="input w-72 bg-base-200 h-10" />
          </div>
          <!-- 点击生成 -->
          <button class="w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70">点击生成</button>
        </div>
      </div>
    </section>
    <!--  section  产品生成明细 -->
    <session-table />
  </main>
</template>

<script setup>
import SessionTable from './components/SessionTable.vue'
</script>