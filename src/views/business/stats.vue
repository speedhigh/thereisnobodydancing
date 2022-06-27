<template>
  <main class="space-y-5">
    <!-- section  统计 -->
    <section class="flex">
      <!-- l -->
      <div class="flex-grow mr-4 stats shadow h-32">
        <!-- 总成交额 -->
        <div class="stat">
          <div class="stat-title">总成交额</div>
          <div class="stat-value text-2xl">36546.02</div>
          <div class="stat-desc">--</div>
        </div>
        <!-- 总成交量 -->
        <div class="stat">
          <div class="stat-title">总成交量</div>
          <div class="stat-value text-2xl">8062</div>
          <div class="stat-desc">--</div>
        </div>
        <!-- 客户数量 -->
        <div class="stat">
          <div class="stat-title">客户数量</div>
          <div class="stat-value text-2xl">4021</div>
          <div class="stat-desc">--</div>
        </div>
      </div>
      <!-- r -->
      <div class="ml-auto flex-shrink-0 stats shadow h-32">
        <!-- 当月成交额（元） -->
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div class="stat-title">当月成交额（元）</div>
          <div class="stat-value text-2xl">15423.63</div>
          <div class="stat-desc">较上个月：↘︎ 14%</div>
        </div>
        
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div class="stat-title">当月成交量（次）</div>
          <div class="stat-value text-2xl">1323</div>
          <div class="stat-desc">较上个月：↗︎ 22%</div>
        </div>
      </div>
    </section>
    <!-- section  业务下发明细 -->
    <section class="w-full bg-base-100 rounded-box shadow p-5">
      <div class="flex items-center">
        <!-- title -->
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">业务下发明细</h2>
        <!-- 筛选 -->
        <BaseSift v-if="list.length > 0" class="ml-auto" />
        <!-- 搜索 -->
        <div v-if="list.length > 0" class="ml-5 w-72 h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4">
          <input type="text" placeholder="搜索关键词" class="bg-base-200 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div v-if="list.length > 0" class="mt-5 w-full rounded-btn shadow-lg shadow-orange-200/50 overflow-x-scroll">
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
            <tr v-for="(item, index) in list" :key="index">
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
      </div>
      <!-- 暂无下发明细 -->
      <div v-if="list.length === 0" class="py-20">
        <img :src="emptyImg" alt="empty" width="406" height="306" class="mx-auto">
        <p class="mt-4 text-center text-gray-500">暂无下发明细</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import emptyImg from '/src/assets/images/empty/business.svg'
import BaseSift from '/src/components/BaseSift.vue'
const list = [
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 0  },
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 0  },
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 1  },
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 0  },
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 1  },
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 0  },
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 1  },
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 1  },
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 1  },
  { id: '202208083363', name: '老祖', customer: '九色鹿', date: '2022-08-08', link: 'https://www.zcool.com.cn/u/21569339', state: 0  },
]
</script>

<style>
  td {
    @apply text-sm text-gray-500 font-normal
  }
</style>