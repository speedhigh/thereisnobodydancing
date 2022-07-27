<template>
  <suspense>
    <template #fallback>
      <BaseLoadingPage />
    </template>
    <template #default>
      <StatsAsync />
    </template>
  </suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import BaseLoadingPage from '/src/components/BaseLoadingPage.vue'

const StatsAsync = defineAsyncComponent(() =>
  import('./components/PageStats.vue')
)
</script>