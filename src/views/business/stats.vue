<template>
  <main class="space-y-5 relative">
    <!-- section  统计 -->
    <session-stat />
    <!-- section  业务下发明细 -->
    <session-table />
  </main>
</template>

<script setup>
import SessionStat from '/src/components/SessionStat.vue'
import SessionTable from './components/SessionTable.vue'
</script>