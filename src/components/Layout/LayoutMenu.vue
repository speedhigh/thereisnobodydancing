<template>
  <div class="w-60 fixed top-16 h-full bg-base-100 shadow z-[999]">
    <ul class="menu p-2 text-gray-500 text-sm">
      <!-- 业务管理 -->
      <li class="py-2 menu-title">
        <span>业务管理 ——</span>
      </li>
      <!-- 业务统计 -->
      <li>
        <router-link to="/business/stats" class="option" :class="{ 'option-sel': $route.name === 'BusinessStats' }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
          </svg>业务统计
        </router-link>
      </li>
      <!-- 业务下发 -->
      <li>
        <router-link to="/business/issuance" class="option" :class="{ 'option-sel': $route.name === 'BusinessIssuance' }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
          </svg>业务下发
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.option:active {
  @apply text-primary-focus bg-gradient-to-r from-orange-100 to-white
}
.option-sel {
  @apply text-primary-focus bg-gradient-to-r from-orange-100 to-white font-bold
}
</style>