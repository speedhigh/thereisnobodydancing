<template>
  <section class="w-full bg-base-100 rounded-box shadow p-5">
    <div class="flex items-center">
      <!-- title -->
      <div class="w-1.5 h-6 rounded bg-primary" />
      <h2 class="ml-2.5">业务下发明细</h2>
      <!-- 筛选 -->
      <BaseSift class="ml-auto" />
      <!-- 搜索 -->
      <div class="ml-5 w-72 h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4">
        <input type="text" placeholder="搜索关键词" class="bg-base-200 text-sm w-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <div class="mt-5 rounded-btn shadow-lg shadow-orange-200/50 overflow-scroll w-full min-h-[60vh]">
      <base-pagination
        url="/salemain/page"
        :params="params"
      >
        <template #default="slotProps">
          <table class="table min-w-full">
            <thead>
              <tr>
                <th>业务编号</th>
                <th>销售</th>
                <th>客户</th>
                <th>办理时间</th>
                <th>业务链接</th>
                <th>状态</th>
                <th class="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in slotProps.list" :key="index">
                <!-- 业务编号 -->
                <td>{{ item.id }}</td>
                <!-- 销售 -->
                <td>{{ item.name }}</td>
                <!-- 客户 -->
                <td>{{ item.customer }}</td>
                <!-- 办理时间 -->
                <td>{{ item.date }}</td>
                <!-- 业务链接 -->
                <td>{{ item.link }}</td>
                <!-- 状态 -->
                <td class="font-bold" :class="item.state === 1 ? 'text-accent' : 'text-error'">
                  {{ item.state === 1 ? '已分享' : '未分享' }}
                </td>
                <!-- 操作 -->
                <td class="text-center">
                  <button 
                    class="w-20 h-8 bg-primary text-base-100 rounded-btn hover:opacity-70"
                    @click="$router.push('/business/detail/' + index)"
                  >
                    查看详情
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </base-pagination>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BaseSift from '/src/components/BaseSift.vue'
import BasePagination from '/src/components/BasePagination.vue'

const params = ref({
  content: ''
})
</script>

<style>
  thead tr th {
    @apply sticky top-0 z-50
  }
  td {
    @apply text-sm text-gray-500 font-normal
  }
</style>