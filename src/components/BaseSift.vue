<template>
  <div>
    <label 
      for="my-modal" 
      class="min-w-[8rem] w-full h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4 cursor-pointer"
    >
      <p>筛选</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </label>

    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <label
      for="my-modal" 
      class="modal cursor-pointer"
    >
      <label class="modal-box relative h-[550px] w-[450px]" for="">
        <h2>请选择地区</h2>
        <label for="my-modal" class="absolute right-6 top-6 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </label>
        <div class="mt-4">
          <!-- tabs -->
          <div class="tabs">
            <div
              v-for="(tab, index) in tabs.list"
              class="tab tab-bordered hover:text-opacity-50"
              :class="tabs.active === index ? 'tab-active' : ''"
            >
              {{ tab }}
            </div>
          </div>
        </div>
      </label>
    </label>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const tabs = reactive({
  active: 0,
  list: ['江苏省', '请选择'],
})
</script>

<style scoped>
  .tab-active {
    @apply border-primary-focus text-primary-focus font-bold
  }
</style>