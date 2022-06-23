<template>
  <div class="flex items-center ml-5" :class="{'mr-3': !date}">
    <Datepicker
      v-model="date"
      placeholder="按时间"
      ref="dp"
      format="yyyy/MM/dd"
      range multiCalendars
      :enableTimePicker="false"
      :inputClassName="date ? 'dp-custom-input-focus' : 'dp-custom-input'" 
      menuClassName="dp-custom-menu"
      :format="format"
      @update:modelValue="handleDate"
    >
      <!-- 自定义星期头部 -->
      <template #calendar-header="{ index, day }">
        <div>
          {{ dayText[index] }}
        </div>
      </template>
      <!-- 自定义显示月 -->
      <template #month="{ text, value }">
        <p>{{ value + 1 }} 月</p>
      </template>
      <!-- 自定义确认按钮 -->
        <template #action-select>
        <p class="cursor-pointer bg-primary-focus mb-2 w-20 ml-auto text-center rounded-md text-white leading-7 hover:ring-2" @click="selectDate">确认</p>
      </template>
      <!-- 自定义月菜单 -->
      <template #month-overlay="{ text, value }">
        <p>{{ value + 1 }} 月</p>
      </template>
    </Datepicker>
    <svg v-show="!date" xmlns="http://www.w3.org/2000/svg" class="-ml-8 h-5 w-5 text-gray-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </div>
</template>

<script>
import { ref } from 'vue'
import dayjs from 'dayjs'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  components: { 
    Datepicker
  },
  emits: ['change', 'clear'],
  setup(params, {emit}) {
    const date = ref()
    const dp = ref()
    const selectDate = () => {
      dp.value.selectDate()
    }
    const dayText = ['日', '一', '二', '三', '四', '五', '六']
    return {
      date,
      dp,
      dayText,
      selectDate,
      handleDate() {
        if(!date.value) {
          emit('clear')
          return
        }
        if(date.value[0] && date.value[1]) {
          emit('change', dayjs(date.value[0]).format('YYYY-MM-DD'), dayjs(date.value[1]).format('YYYY-MM-DD'))
          return
        }
        if(date.value[0] && !date.value[1]) {
          emit('change', dayjs(date.value[0]).format('YYYY-MM-DD'), '')
          return
        }
      },
    }
  }
}

</script>

<style>
/* 输入框默认样式 */
.dp-custom-input {
  @apply w-32 rounded-box h-9 text-sm placeholder:text-gray-900 border-none bg-base-200
}
/* 输入框选择日期后的样式 */
.dp-custom-input-focus {
  @apply rounded-box h-9 text-sm placeholder:text-gray-900 border-none bg-base-200 pr-8
}
.dp-custom-menu {
  @apply border-none rounded-box shadow-xl
}
.dp__action_row {
  @apply rounded-xl
}
.dp__range_end, .dp__range_start {
  @apply bg-primary-focus rounded-md
}
.dp__instance_calendar {
  @apply p-2
}
.dp__flex_display {
  @apply flex space-x-2
}
/* 今天 */
.dp__today {
  @apply border-primary-focus rounded-lg
}
.dp__overlay_cell_active {
  @apply bg-primary-focus
}
.dp__selection_preview {
  @apply text-sm font-bold text-primary
}
</style>