<template>
  <div>
    <button 
      class="min-w-[8rem] flex items-center"
      :class="boxStyle"
      @click="show=true"
    >
      <p :class="{'text-gray-500': title !== defaultTitle}">{{ title }}</p>
      <svg v-if="title === defaultTitle" xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      <svg v-else @click.stop="clear" xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5 text-gray-400 hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
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
        title="请选择所在地区"
        :options="options"
        active-color="#FF432A"
        :field-names="fieldNames"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import api from '/src/api/index.js'
const emit = defineEmits(['change', 'clear'])
const props = defineProps({
  boxStyle: {
    type: String,
    default: 'w-56 h-10 bg-base-200 rounded-md px-3 text-sm text-gray-400'
  },
  defaultTitle: {
    type: String,
    default: '请选择地区'
  }
})
const title = ref('')
title.value = props.defaultTitle
const show = ref(false)
const cascaderValue = ref('')
const options = ref([])
const fieldNames = {
  text: 'text',
  value: 'value',
  children: 'cityDtos',
}
api.get('/userdoctor/proandcity').then((res) => {
  options.value = res.data.data
})
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  title.value = selectedOptions.map((option) => option.text).join('/')
  emit('change', selectedOptions[selectedOptions.length - 1].value)
}
// 清除地区
const clear = function() {
  cascaderValue.value = ''
  title.value = props.defaultTitle
  emit('clear')
}
defineExpose({ clear })
</script>