<template>
  <main class="space-y-5">
    <!-- section  统计 -->
    <base-stat />
    <!-- section  订单明细 -->
    <section class="w-full bg-base-100 rounded-box shadow p-5">
      <div class="flex items-center">
        <!-- title -->
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">订单明细</h2>
        <!-- 按地区 -->
        <base-sift-city
          class="ml-auto"
          boxStyle="h-9 bg-base-200 text-gray-500 rounded-box px-4"
          @change="cityChange"
          @clear="cityClear"
        />
        <!-- 按时间 -->
        <base-datepicker @change="dateChange" @clear="dateClear" />
        <!-- search -->
        <div class="ml-5 w-72 h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4">
          <input v-model="params.content" type="text" placeholder="搜索关键词" class="bg-base-200 text-sm w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-5 rounded-btn shadow-lg shadow-orange-200/50 overflow-scroll w-full max-h-[79vh] pb-2">
        <base-pagination
          ref="paginationRef"
          url="/ordermain/doctororder"
          :params="params"
          descriptionTips="暂无明细"
        >
          <template #default="slotProps">
            <table class="table min-w-full">
              <thead>
                <tr>
                  <th>订单编号</th>
                  <th>客户</th>
                  <th>购买人</th>
                  <th>下单时间</th>
                  <th>成交额</th>
                  <th class="text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in slotProps.list" :key="index">
                  <!-- 订单编号 -->
                  <td>{{ item.orderid }}</td>
                  <!-- 客户 -->
                  <td>{{ item.doctorname }}</td>
                  <!-- 购买人 -->
                  <td>{{ item.buyer }}</td>
                  <!-- 下单时间 -->
                  <td>{{ item.submittime }}</td>
                  <!-- 成交额 -->
                  <td>{{ item.chengjiaoe }}</td>
                  <!-- 操作 -->
                  <td class="text-center">
                    <button
                      class="w-20 h-8 bg-primary text-base-100 rounded-btn hover:opacity-70"
                      @click="$router.push('/business/detail/' + item.orderid)"
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
  </main>
</template>

<script setup>
import { ref } from 'vue'
import BasePagination from '/src/components/BasePagination.vue'
import BaseDatepicker from '/src/components/BaseDatepicker.vue'
import BaseStat from '/src/components/BaseStat.vue'
import BaseSiftCity from '/src/components/BaseSiftCity.vue'
import api from '../../../api'
const params = ref({
  content: '',
  citycode: '',
  starttime: '',
  endtime: ''
})

api.get('/ordermain/getFanYong').then((res) => {
  console.log(res)
})

// 地区的修改和删除
const cityChange = function(code) {
  console.log(code)
  params.value.citycode = code
}
const cityClear = function() {
  params.value.citycode = ''
}
// 日期的修改和清除
const dateChange = function(start, end) {
  params.value.starttime = start
  params.value.endtime = end
}
const dateClear = function() {
  params.value.starttime = params.value.endtime = ''
}
</script>

<style>
  td {
    @apply text-sm text-gray-500 font-normal
  }
</style>