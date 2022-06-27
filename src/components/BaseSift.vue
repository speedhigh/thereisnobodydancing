<template>
  <div>
    <button 
      class="min-w-[8rem] h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4"
      @click="show=true"
    >
      <p>{{ title }}</p>
      <svg v-if="title === '筛选'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      <svg v-else @click.stop="clear" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
    </button>

    <van-popup 
      v-model:show="show" 
      round
      :style="{ height: '500px', width: '400px' }"
      class="p-2 modal-box"
    >
      <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        :options="options"
        active-color="#FF432A"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
const title = ref('筛选')
const cascaderValue = ref('')
const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      { 
        text: '杭州市', 
        value: '330100', 
        children: [
          {
            text: '杭州第一医院',
            value: 'hz001',
            children: [
              { text: '吴良医生', value: 'hz1' },
              { text: '大聪明医生', value: 'hz2' },
              { text: '大漂亮医生', value: 'hz3' }
            ]
          },
          {
            text: '杭州第二医院',
            value: 'hz002',
            children: [
              { text: '吴良医生2', value: 'hz21' },
              { text: '大聪明医生2', value: 'hz22' },
              { text: '大漂亮医生2', value: 'hz23' },
            ]
          },
        ]
      }
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      { 
        text: '南京市', 
        value: '320100',
        children: [
          {
            text: '南京美容美体医疗中心大医院',
            value: 'nj001',
            children: [
              { text: '瓦莉拉·妮谷拉丝·安', value: 'mj1' },
            ]
          }
        ] 
      }
    ],
  },
]

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  title.value = selectedOptions.map((option) => option.text).join('/')
}
const clear = function() {
  cascaderValue.value = ''
  title.value = '筛选'
}
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