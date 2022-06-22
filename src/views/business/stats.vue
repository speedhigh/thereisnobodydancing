<template>
  <main class="space-y-5">
    <!-- start -->
    <section class="flex">
      <!-- l -->
      <div class="flex-grow mr-4 stats shadow h-28">
        <!-- 总成交额 -->
        <div class="stat">
          <div class="stat-title">总成交额</div>
          <div class="stat-value text-3xl">36546.02</div>
          <!-- <div class="stat-desc">Jan 1st - Feb 1st</div> -->
        </div>
        <!-- 总成交量 -->
        <div class="stat">
          <div class="stat-title">总成交量</div>
          <div class="stat-value text-3xl">8062</div>
          <!-- <div class="stat-desc">↗︎ 400 (22%)</div> -->
        </div>
        <!-- 客户数量 -->
        <div class="stat">
          <div class="stat-title">客户数量</div>
          <div class="stat-value text-3xl">4021</div>
          <!-- <div class="stat-desc">↘︎ 90 (14%)</div> -->
        </div>
      </div>
      <!-- r -->
      <div class="ml-auto flex-shrink-0 stats shadow h-28">
        <!-- 当月成交额（元） -->
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-title">当月成交额（元）</div>
          <div class="stat-value text-3xl">15423.63</div>
          <div class="stat-desc">较上个月：↘︎ 14%</div>
        </div>
        
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div class="stat-title">当月成交量（次）</div>
          <div class="stat-value text-3xl">1323</div>
          <div class="stat-desc">较上个月：↗︎ 22%</div>
        </div>
      </div>
    </section>
    <!-- table -->
    <section class="w-full h-60 bg-base-100 rounded-box shadow p-5">
      <div class="flex items-center">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">业务下发明细</h2>
      </div>
    </section>
  </main>
</template>