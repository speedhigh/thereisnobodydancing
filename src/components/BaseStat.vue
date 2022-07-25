<template>
  <section class="flex fm">
    <!-- l -->
    <div class="flex-grow mr-4 stats shadow h-32">
      <!-- 总成交额 -->
      <div class="stat">
        <div class="stat-title">总成交额</div>
        <div class="stat-value text-2xl">{{ statData.zongchengjiaoe }}</div>
        <div class="stat-desc">--</div>
      </div>
      <!-- 总成交量 -->
      <div class="stat">
        <div class="stat-title">总成交量</div>
        <div class="stat-value text-2xl">{{ statData.zongchengjiaoliang }}</div>
        <div class="stat-desc">--</div>
      </div>
      <!-- 客户数量 -->
      <div class="stat">
        <div class="stat-title">客户数量</div>
        <div class="stat-value text-2xl">{{ statData.kehushuliang }}</div>
        <div class="stat-desc">--</div>
      </div>
    </div>
    <!-- r -->
    <div class="ml-auto flex-shrink-0 stats shadow h-32">
      <!-- 当月成交额（元） -->
      <div class="stat">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <div class="stat-title">当月成交额（元）</div>
        <div class="stat-value text-2xl">{{ statData.dangyuechengjiaoe }}</div>
        <div class="stat-desc">较上个月：↗︎ {{ statData.bishangyuechengjiaoe }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <div class="stat-title">当月成交量（次）</div>
        <div class="stat-value text-2xl">{{ statData.dangyuechengjiaoliang }}</div>
        <div class="stat-desc">较上个月：↘︎ {{ statData.bishangyuejiaoliang }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import api from '/src/api/index.js'

const statData = ref({
  dangyuechengjiaoe: '',
  dangyuechengjiaoliang: '',
  kehushuliang: '',
  zongchengjiaoe: '',
  zongchengjiaoliang: '',
})
api.get('/salemain/anasale').then((res) => {
  Object.assign(statData.value, res.data.data)
})
</script>

<style>
.fm {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>