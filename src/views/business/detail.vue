<template>
  <suspense>
    <template #fallback>
      <BaseLoadingPage />
    </template>
    <template #default>
      <DetailAsync />
    </template>
  </suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import BaseLoadingPage from '/src/components/BaseLoadingPage.vue'

const DetailAsync = defineAsyncComponent(() =>
  import('./components/PageDetail.vue')
)
</script>