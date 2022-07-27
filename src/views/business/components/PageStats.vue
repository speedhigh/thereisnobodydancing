<template>
  <main class="space-y-5 relative">
    <!-- section  统计 -->
    <base-stat />
    <!-- section  业务下发明细 -->
    <session-table />
  </main>
</template>

<script setup>
import BaseStat from '/src/components/BaseStat.vue'
import SessionTable from './SessionTable.vue'
</script>