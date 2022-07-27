<template>
  <suspense>
    <template #fallback>
      <BaseLoadingPage />
    </template>
    <template #default>
      <IssuanceAsync />
    </template>
  </suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import BaseLoadingPage from '/src/components/BaseLoadingPage.vue'

const IssuanceAsync = defineAsyncComponent(() =>
  import('./components/PageIssuance.vue')
)
</script>