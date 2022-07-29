<template>
  <section class="w-full bg-base-100 rounded-box shadow p-5">
    <div class="flex items-center">
      <!-- title -->
      <div class="w-1.5 h-6 rounded bg-primary" />
      <h2 class="ml-2.5">业务下发明细</h2>
      <!-- 筛选 -->
      <base-sift-doctor
        ref="siftRef" 
        class="ml-auto" 
        @change="changeDoctor"
        @clear="params.doctoruuid = ''"
      />
      <!-- 搜索 -->
      <div class="ml-5 w-72 h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4">
        <input v-model="params.content" type="text" placeholder="搜索关键词" class="bg-base-200 text-sm w-full" @input="changeContent">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <div class="mt-5 rounded-btn shadow-lg shadow-orange-200/50 overflow-scroll w-full max-h-[79vh] pb-2">
      <base-pagination
        ref="paginationRef"
        url="/salemain/page"
        :params="params"
        descriptionTips="暂无明细"
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
                <td>{{ item.salename }}</td>
                <!-- 客户 -->
                <td>{{ item.doctorname }}</td>
                <!-- 办理时间 -->
                <td>{{ dayjs(item.inserttime).format('YYYY-MM-DD HH:mm:ss') }}</td>
                <!-- 业务链接 -->
                <td>
                  <p class="w-[400px] overflow-x-scroll bg-gray-100 rounded px-2 leading-8">{{  item.href }}</p>
                </td>
                <!-- 状态 -->
                <td class="font-bold" :class="item.state === 2 ? 'text-accent' : 'text-gray-400'">
                  {{ item.state === 2 ? '已付款' : '未付款' }}
                </td>
                <!-- 操作 -->
                <td class="text-center">
                  <button
                    class="w-20 h-8 bg-primary text-base-100 rounded-btn hover:opacity-70"
                    @click="$router.push('/business/detail/' + item.id + '?from=salemain')"
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
import dayjs from 'dayjs'
import BaseSiftDoctor from '/src/components/BaseSiftDoctor.vue'
import BasePagination from '/src/components/BasePagination.vue'

const params = ref({
  content: '',
  doctoruuid: ''
})

const siftRef = ref()
const paginationRef = ref()

// 切换医生
const changeDoctor = function(id) {
  params.value.content = ''
  params.value.doctoruuid = id
}
// 输入内容
const changeContent = function() {
  if(params.value.content) {
    params.value.doctoruuid = ''
    siftRef.value.clear()
  }
}
// 刷新列表
const refresh = function() {
  paginationRef.value.BasePaginationMitt.emit('refresh')
}
defineExpose({ refresh })
</script>

<style>
  thead tr th {
    @apply sticky top-0 z-50
  }
  td {
    @apply text-sm text-gray-500 font-normal
  }
</style>