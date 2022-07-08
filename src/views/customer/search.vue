<template>
  <main class="space-y-5 relative">
    <!-- section  客户查询 -->
    <section class="w-full h-52 rounded-box shadow bg-base-100 p-5 space-y-10">
      <div class="flex items-center space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">客户查询</h2>
      </div>
      <div class="w-[37.5rem] h-[3.38rem] mx-auto flex items-center bg-base-200 rounded-btn">
        <div class="flex-grow w-full h-10 px-4">
          <input v-model="searchValue" type="text" placeholder="输入关键词搜索" class="w-full h-full bg-base-200 text-sm" @keydown.enter="search">
        </div>
        <div class="ml-auto flex-shrink-0 w-[7.5rem] h-full rounded-btn">
          <button 
            class="w-full h-full bg-primary text-base-100 text-sm rounded-btn hover:opacity-70" 
            @click="search"
          >
            搜索
          </button>
        </div>
      </div>
    </section>
    <!-- section  查询结果 -->
    <section
      v-if="showTable"
      class="w-full bg-base-100 rounded-box shadow p-5"
    >
      <div class="flex items-center">
        <!-- title -->
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">查询结果 “{{ params.content }}”</h2>
        <!-- search -->
        <!-- <div class="ml-auto w-72 h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4">
          <input v-model="searchValue2" type="text" placeholder="搜索关键词" class="bg-base-200 text-sm w-full" @keydown.enter="params.content = searchValue = searchValue2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" @click="params.content = searchValue = searchValue2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div> -->
      </div>
      <!-- table -->
      <div class="mt-5 rounded-btn shadow-lg shadow-orange-200/50 overflow-scroll w-full max-h-[79vh] pb-2">
        <base-pagination
          ref="paginationRef"
          url="/userdoctor/page"
          :params="params"
        >
          <template #default="slotProps">
            <table class="table min-w-full">
              <thead>
                <tr>
                  <th>客户编号</th>
                  <th>客户姓名</th>
                  <th>登记时间</th>
                  <th>手机号</th>
                  <th>所属医院</th>
                  <th class="text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in slotProps.list" :key="index">
                  <!-- 客户编号 -->
                  <td>{{ item.id }}</td>
                  <!-- 客户姓名 -->
                  <td>{{ item.name }}</td>
                  <!-- 登记时间 -->
                  <td>{{ dayjs(item.inserttime).format('YYYY-MM-DD HH:mm:ss') }}</td>
                  <!-- 手机号 -->
                  <td>{{ item.mobile }}</td>
                  <!-- 所属医院 -->
                  <td>{{ item.hosname }}</td>
                  <!-- 操作 -->
                  <td 
                    class="text-primary-focus text-center cursor-pointer"
                    @click="deleteCustomer(item.id)"
                  >
                    删除客户
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </base-pagination>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import BasePagination from '/src/components/BasePagination.vue'
import dayjs from 'dayjs'

const showTable = ref(false)
const searchValue = ref('')
const searchValue2 = ref('')
const params = ref({
  content: ''
})
const search = function() {
  params.value.content = searchValue2.value = searchValue.value
  showTable.value = true
}
</script>