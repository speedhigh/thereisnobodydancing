<template>
  <main class="space-y-5">
    <!-- section  统计 -->
    <session-stat />
    <!-- section  业务下发明细 -->
    <section class="w-full bg-base-100 rounded-box shadow p-5">
      <div class="flex items-center">
        <!-- title -->
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">业务下发明细</h2>
        <!-- 按地区 -->
        <button class="ml-auto w-32 h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4">
          <p>按地区</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <!-- 按时间 -->
        <base-datepicker @change="dateChange" @clear="clearDate" />
        <!-- search -->
        <div class="ml-5 w-72 h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4">
          <input type="text" placeholder="搜索关键词" class="bg-base-200 text-sm w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-5 w-full rounded-btn shadow-lg shadow-orange-200/50 overflow-x-scroll">
        <table class="table min-w-full">
          <thead>
            <tr>
              <th>订单编号</th>
              <th>客户</th>
              <th>购买人</th>
              <th>下单时间</th>
              <th>成交额</th>
              <th>返佣</th>
              <th class="text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <!-- 订单编号 -->
              <td>{{ item.id }}</td>
              <!-- 客户 -->
              <td>{{ item.customer }}</td>
              <!-- 购买人 -->
              <td>{{ item.buyer }}</td>
              <!-- 下单时间 -->
              <td>{{ item.date }}</td>
              <!-- 成交额 -->
              <td>{{ item.turnover }}</td>
              <!-- 返佣 -->
              <td class="text-primary">{{ item.rebate }}</td>
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
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import BaseDatepicker from '/src/components/BaseDatepicker.vue'
import SessionStat from '/src/components/SessionStat.vue'
const list = [
  { id: '202208083363', customer: '九色鹿', buyer: '肉灵芝', date: '2022-08-08', turnover: '600.63', rebate: '60', state: 0  },
  { id: '202208083363', customer: '九色鹿', buyer: '肉灵芝', date: '2022-08-08', turnover: '600.63', rebate: '60', state: 0  },
  { id: '202208083363', customer: '九色鹿', buyer: '肉灵芝', date: '2022-08-08', turnover: '600.63', rebate: '60', state: 0  },
  { id: '202208083363', customer: '九色鹿', buyer: '肉灵芝', date: '2022-08-08', turnover: '600.63', rebate: '60', state: 0  },
  { id: '202208083363', customer: '九色鹿', buyer: '肉灵芝', date: '2022-08-08', turnover: '600.63', rebate: '60', state: 0  },
  { id: '202208083363', customer: '九色鹿', buyer: '肉灵芝', date: '2022-08-08', turnover: '600.63', rebate: '60', state: 0  }
]
const params = ref({
  startTime: '',
  endTime: ''
})
const dateChange = function(start, end) {
  params.value.startTime = start
  params.value.endTime = end
}
const clearDate = function() {
  params.value.startTime = params.value.endTime = ''
}
</script>

<style>
  td {
    @apply text-sm text-gray-500 font-normal
  }
</style>