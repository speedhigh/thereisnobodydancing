<template>
  <div>
    <div v-show="showLoading" class="text-center">
      <van-loading size="30" class="py-4">
        加载中，请稍后...
      </van-loading>
    </div>
    <div v-show="!showLoading">
      <van-list
        v-show="localList.length > 0"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        @load="onLoad"
      >
        <slot :list="localList" />
      </van-list>
      <!-- empty -->
      <div v-if="localList.length === 0" class="py-20">
        <img :src="emptyImg" alt="empty" width="406" height="306" class="mx-auto">
        <p class="mt-4 text-center text-gray-500">{{ descriptionTips }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import mitt from 'mitt'
import { onMounted, ref, watch } from 'vue'
import { pickBy } from 'lodash'
import api from '/src/api/index.js'
import emptyImg from '/src/assets/images/empty/business.svg'
export default {
  props: {
    offset: {
      type: Number,
      default: 200
    },
    descriptionTips: {
      type: String,
      default: '列表为空'
    },
    url: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default:'20'
    },
    params: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const BasePaginationMitt = mitt()
    const showLoading = ref(true)
    const currentPage = ref(1)
    const size = ref(props.size)
    const localList = ref([])
    const loading = ref(false)
    const finished = ref(false)

    // askApi 设置翻页规则
    const askApi = function(more = true) {
      const newParams = {}
      loading.value = true
      if (!more) {
        currentPage.value = 1
        finished.value = false
      }
      Object.assign(newParams, props.params, { currentPage: currentPage.value, size:size.value })

      api.get(props.url, pickBy(newParams)).then((res) => {
        if (more) {
          localList.value.push(...res.data.data.records)
        } else {
          localList.value = res.data.data.records
        }
        loading.value = false
        if (res.data.data.current*res.data.data.size >= res.data.data.total) {
          finished.value = true
        }
        showLoading.value = false
      })
    }

    // 设置加载中的状态
    const onLoad = function() {
      currentPage.value++
      askApi()
    }

    onMounted(() => { askApi(false) })

    BasePaginationMitt.on('refresh',()=>{askApi(false)})

    watch(props.params, (value) => {
      finished.value = false
      askApi(false)
    }, {
      deep: true
    })

    return {
      emptyImg,
      BasePaginationMitt,
      showLoading,
      localList,
      currentPage,
      loading,
      finished,
      onLoad
    }
  }
}
</script>
