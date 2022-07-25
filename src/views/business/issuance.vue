<template>
  <main class="space-y-5">
    <!-- section  生成产品链接 -->
    <section class="w-full bg-base-100 rounded-box shadow p-5 h-64">
      <div class="flex space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2>生成产品链接</h2>
      </div>
      <div class="px-4">
        <div class="mt-[1.88rem] flex items-center space-x-10">
          <!-- 选择产品 -->
          <div class="flex items-center space-x-5">
            <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>选择产品</p>
            <div
              v-for="(item, index) in proList"
              :key="index"
              class="w-[7.63rem] h-[4.81rem] rounded-btn shadow cursor-pointer hover:opacity-80 relative"
              @click="active = index; linkData.href = ''"
            >
              <img :src="item.thumbnail" :alt="item.name" width="122" height="77" class="w-full h-full rounded-btn">
              <div class="absolute top-2 right-2 w-4 h-4 bg-gray-100 shadow-md rounded-full p-1">
                <div v-show="active === index" class="w-full h-full rounded-full bg-primary" />
              </div>
              <div class="absolute bottom-0 inset-x-0 w-full bg-[rgba(0,0,0,0.5)] text-white text-center text-sm rounded-b-lg leading-6">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div class="mt-[1.88rem] flex items-center space-x-10">
          <!-- 选择医生 -->
          <div class="flex items-center space-x-5">
            <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>选择医生</p>
            <base-sift-doctor
              ref="siftRef" 
              default-title="请选择"
              only-doctor
              box-style="w-48 bg-base-200 h-10 rounded-btn px-4 text-gray-500"
              @change="changeDoctor"
              @clear="linkData.doctoruuid = linkData.href = ''"
            />
          </div>
          <!-- 链接生成 -->
          <div class="flex items-center space-x-5">
            <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>链接生成</p>
            <div class="w-96 bg-base-200 h-10 rounded-btn px-4 text-gray-500">
              <input
                ref="inputCopy" 
                v-model="linkData.href" 
                type="text" 
                class="w-full h-full bg-base-200" 
                readonly
              >
            </div>
          </div>
          <!-- 点击生成 -->
          <button 
            class="w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70 disabled:opacity-70"
            :disabled="btnDisabled"
            @click="build"
          >
            点击生成
          </button>
        </div>
      </div>
    </section>
    <!--  section  产品生成明细 -->
    <session-table ref="tableRef" />
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Message from '/src/components/Message/Message.js'
import Dialog from '/src/components/Dialog/Dialog.js'
import BaseSiftDoctor from '/src/components/BaseSiftDoctor.vue'
import SessionTable from './components/SessionTable.vue'
import typeBannerA from '/src/assets/images/business/drug.png'
import typeBannerB from '/src/assets/images/business/health.png'
import typeBannerC from '/src/assets/images/business/devices.png'
import api from '../../api'

const user = JSON.parse(sessionStorage.getItem('user'))
const siftRef = ref()
const tableRef = ref()
// 产品类型
const active = ref(0)
const proList = ref([])
api.get('/product/getList').then((res) => {
  proList.value = res.data.data
})
// 医生，链接
const linkData = reactive({
  href: '',
  doctoruuid: ''
})
// 切换医生
const changeDoctor = function(id) {
  linkData.doctoruuid = id
  linkData.href = ''
}
const inputCopy = ref()
const btnDisabled = ref(false)

// 复制链接
const copy = function() {
  inputCopy.value.select()
  document.execCommand('copy')
  Message({ text: '已生成产品链接，快去分享给你的客户吧！', type: 'success' })
}

// 生成链接
const build = function() {
  btnDisabled.value = true
  if(!linkData.doctoruuid) {
    Message({ text: '信息不完整' })
    btnDisabled.value = false
    return
  }
  linkData.href = `http://www.guangdajiankang.com/share?saleid=${user.uuid}&doctorid=${linkData.doctoruuid}&proid=${proList.value[active.value].id}`
  api.get('/salemain/add', linkData).then((res) => {
    if(res.data.code === 20000) {
      copy()
      tableRef.value.refresh()
      setTimeout(() => btnDisabled.value = false, 300)
    }
    if(res.data.code === 20001) {
      Dialog({ text: res.data.msg, showCancel: false }).then(() => {
        linkData.href = ''
        siftRef.value.clear()
      })
      setTimeout(() => btnDisabled.value = false, 300)
    }
  })
}
</script>