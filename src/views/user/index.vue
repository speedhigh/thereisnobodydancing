<template>
  <main class="space-y-5">
    <!-- section 个人信息 -->
    <section class="w-full h-[11.25rem] rounded-box shadow bg-base-100 p-10 flex items-center">
      <!-- avatar -->
      <img src="https://api.lorem.space/image/face?w=150&h=150" alt="avatar" width="100" height="100" class="w-[6.25rem] h-[6.25rem] rounded-full flex-shrink-0">
      <div class="ml-[1.88rem] space-y-6">
        <p class="text-2xl font-bold">老祖</p>
        <p class="text-lg text-gray-500">手机号：17076868695</p>
      </div>
      <button class="ml-auto w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70">退出登录</button>
    </section>
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
    <!-- section 修改密码 -->
    <section class="w-full h-[21.5rem] rounded-box shadow bg-base-100 px-5 pt-5 pb-8">
      <div class="flex items-center space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">修改密码</h2>
      </div>
      <div class="px-4">
        <!-- 旧密码 -->
        <div class="mt-[1.88rem] flex items-center space-x-5">
          <p class="text-gray-500"><span class="text-primary">*</span>旧密码</p>
          <input type="text" placeholder="请输入旧密码" class="input w-[18.75rem] bg-base-200 h-10" />
        </div>
        <!-- 验证码 -->
        <div class="mt-[1.88rem] flex items-center space-x-5">
          <p class="text-gray-500"><span class="text-primary">*</span>验证码</p>
          <input type="text" placeholder="请输入旧密码" class="input w-40 bg-base-200 h-10" />
          <button class="w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70">发送验证码</button>
        </div>
        <!-- 新密码 -->
        <div class="mt-[1.88rem] flex items-center space-x-5">
          <p class="text-gray-500"><span class="text-primary">*</span>新密码</p>
          <input type="text" placeholder="请输入新密码" class="input w-[18.75rem] bg-base-200 h-10" />
        </div>
        <!-- 立即修改 -->
        <button class="mt-5 w-[7.5rem] h-10 bg-primary text-base-100 text-sm hover:opacity-70 rounded-btn">立即修改</button>
      </div>
    </section>
  </main>
</template>