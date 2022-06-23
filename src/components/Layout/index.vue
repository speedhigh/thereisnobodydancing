<template>
  <div class="relative pt-16">
    <!-- header -->
    <LayoutHeader />
    <div class="relative bg-gray-50" :style="{ minHeight: contentHeight + 'px' }">
      <!-- menu -->
      <LayoutMenu />
      <!-- content -->
      <div class="pl-[16.25rem] w-full p-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import LayoutHeader from './LayoutHeader.vue'
import LayoutMenu from './LayoutMenu.vue'
const contentHeight = document.documentElement.clientHeight - 64
</script>