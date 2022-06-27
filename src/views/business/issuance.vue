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
    <section class="w-full bg-base-100 rounded-box shadow p-5">
      <div class="flex items-center">
        <!-- title -->
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">产品生成明细</h2>
        <!-- 筛选 -->
        <BaseSift class="ml-auto" />
        <!-- 搜索 -->
        <div class="ml-5 w-72 h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4">
          <input type="text" placeholder="搜索关键词" class="bg-base-200 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-5 w-full rounded-btn shadow-lg shadow-orange-200/50 overflow-x-scroll">
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
    </section>
  </main>
</template>

<script setup>
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