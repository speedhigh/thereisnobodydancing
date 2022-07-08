<template>
  <div>
    <button 
      class="min-w-[8rem] flex items-center justify-between"
      :class="boxStyle"
      @click="show=true"
    >
      <p>{{ title }}</p>
      <svg v-if="title === defaultTitle" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      <svg v-else @click.stop="clear" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
    </button>

    <van-popup 
      v-model:show="show"
      round
      :style="{ height: '550px', width: '450px' }"
      class="p-2 modal-box"
    >
      <van-cascader
        v-model="cascaderValue"
        :title="popupTitle"
        :options="options"
        active-color="#FF432A"
        @close="show = false"
        @change="onChange"
        @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import api from '/src/api/index.js'

const props = defineProps({
  boxStyle: {
    type: String,
    default: 'h-9 bg-base-200 text-gray-500 rounded-box px-4'
  },
  defaultTitle: {
    type: String,
    default: '筛选'
  },
  onlyDoctor: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change', 'clear'])

const show = ref(false)
const title = ref('')
title.value = props.defaultTitle
const popupTitle = ref('请选择所在地区')
const cascaderValue = ref('')
const options = ref([])

if(sessionStorage.getItem("doctorList")) {
  options.value = JSON.parse(sessionStorage.getItem("doctorList"))
} else {
  api.get('/salemain/searchdata').then((res) => {
    options.value = res.data.data
    sessionStorage.setItem('doctorList', JSON.stringify(res.data.data))
  })
}

const onChange = (e) => {
  if(e.tabIndex < 1) popupTitle.value = '请选择所在地区'
  if(e.tabIndex === 1) popupTitle.value = '请选择医院'
  if(e.tabIndex === 2) popupTitle.value = '请选择医生'
}

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  if(props.onlyDoctor) title.value = selectedOptions[selectedOptions.length - 1].text
  if(!props.onlyDoctor) title.value = selectedOptions.map((option) => option.text).join('/')
  emit('change', selectedOptions[selectedOptions.length - 1].value)
}
const clear = function() {
  cascaderValue.value = ''
  title.value = props.defaultTitle
  emit('clear')
}
defineExpose({ clear })
</script>

<style>
.van-tabs {
  @apply px-2
}
.van-tabs__nav--line.van-tabs__nav--shrink, .van-tabs__nav--line.van-tabs__nav--complete {
  @apply pl-0 pr-0
}
.van-cascader__title {
  @apply text-lg font-bold
}
.van-cascader__close-icon {
  @apply font-bold text-gray-700
}
.van-tab--active {
  @apply font-bold text-primary
}
.van-tabs__wrap {
  @apply border-b
}
</style>