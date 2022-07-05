<template>
  <main class="space-y-5">
    <!-- section  客户登记 -->
    <section class="w-full h-52 rounded-box shadow bg-base-100 p-5 space-y-7">
      <div class="flex items-center space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">客户登记</h2>
      </div>
      <div class="flex items-center space-x-5 px-2">
        <!-- 客户姓名 -->
        <div class="flex items-center space-x-2">
          <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>客户姓名</p>
          <input v-model="form.name" type="text" placeholder="请输入姓名" class="input w-28 bg-base-200 h-10" />
        </div>
        <!-- 客户手机号 -->
        <div class="flex items-center space-x-2">
          <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>客户手机号</p>
          <input v-model="form.mobile" type="tel" placeholder="请输入手机号" maxlength="11" class="input w-32 bg-base-200 h-10" />
        </div>
        <!-- 所在地区 -->
        <div class="flex items-center space-x-2" @click="show=true">
          <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>所在地区</p>
          <div class="w-56 h-10 bg-base-200 rounded-md px-3 flex items-center text-sm cursor-pointer">
            <p :class="{'text-gray-400': cityText==='请选择地区'}">{{ cityText }}</p>
            <svg v-if="cityText === '请选择地区'" xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <svg v-else @click.stop="clearRegion" xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5 text-gray-400 hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <van-popup 
          v-model:show="show"
          round
          :style="{ height: '550px', width: '450px' }"
          class="p-2 modal-box"
        >
          <van-cascader
            v-model="form.citycode"
            title="请选择所在地区"
            :options="options"
            active-color="#FF432A"
            :field-names="fieldNames"
            @close="show = false"
            @finish="onFinish"
          />
        </van-popup>
        <!-- 所属医院 -->
        <div class="flex items-center space-x-2">
          <p class="text-gray-500 flex-shrink-0"><span class="text-primary">*</span>所属医院</p>
          <input v-model="form.hosname" type="text" placeholder="请输入所属医院" max="99999999999" class="input w-48 max-w-md bg-base-200 h-10" />
        </div>
      </div>
      <div class="text-center">
        <button 
          :disabled = btnDisabled
          class="w-[7.5rem] h-10 bg-primary text-base-100 text-sm rounded-btn hover:opacity-70 disabled:opacity-70"
          @click="registered"
        >
          确认登记
        </button>
      </div>
    </section>
    <!-- section  已登记客户 -->
    <section class="w-full bg-base-100 rounded-box shadow p-5">
      <div class="flex items-center">
        <!-- title -->
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">已登记客户</h2>
        <!-- search -->
        <div class="ml-auto w-72 h-9 flex items-center justify-between bg-base-200 text-gray-500 rounded-box px-4">
          <input type="text" placeholder="搜索关键词" class="bg-base-200 text-sm w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <!-- table -->
      <div class="mt-5 rounded-btn shadow-lg shadow-orange-200/50 overflow-scroll w-full min-h-[50vh]">
        <base-pagination
          url="/userdoctor/page"
          :params="params"
        >
          <template #default="slotProps">
            <table class="table min-w-full">
              <thead>
                <tr>
                  <th>客户编号</th>
                  <th>客户姓名</th>
                  <th>登记时间</th>
                  <th>手机号</th>
                  <th>所属医院</th>
                  <th class="text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in slotProps.list" :key="index">
                  <!-- 客户编号 -->
                  <td>{{ item.id }}</td>
                  <!-- 客户姓名 -->
                  <td>{{ item.customer }}</td>
                  <!-- 登记时间 -->
                  <td>{{ item.date }}</td>
                  <!-- 手机号 -->
                  <td>{{ item.tel }}</td>
                  <!-- 所属医院 -->
                  <td>{{ item.hospital }}</td>
                  <!-- 操作 -->
                  <td class="text-primary-focus text-center cursor-pointer">删除客户</td>
                </tr>
              </tbody>
            </table>
          </template>
        </base-pagination>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Message from '/src/components/Message/Message.js'
import { checkPhone } from '/src/until/index.js'
import api from '/src/api/index.js'
import BasePagination from '/src/components/BasePagination.vue'

const list = [] // 一会删

const form = reactive({
  name: '',
  mobile: '',
  hosname: '',
  citycode: ''
})

const btnDisabled = ref(false)

/****************地区相关 ****************/
const cityText = ref('请选择地区')
const show = ref(false)
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
  cityText.value = selectedOptions.map((option) => option.text).join('/')
}
// 清除地区
const clearRegion = function() {
  form.citycode = ''
  cityText.value = '请选择地区'
}
/**************** 登记 ****************/
const registered = function() {
  btnDisabled.value = true
  if(!form.name || !form.mobile || !form.hosname || !form.citycode) {
    Message({ text: '请填写完整信息', type: 'warn' })
    btnDisabled.value = false
    return
  }
  if(!checkPhone(form.mobile)) {
    Message({ text: '手机号格式不正确', type: 'warn' })
    btnDisabled.value = false
    return
  }
  api.post('/userdoctor/add', form).then((res) => {
    if(res.data === 'SUCCESS') {
      Message({ text: '登记成功！', type: 'success' })
      form.name = form.mobile = form.hosname = ''
      clearRegion()
      setTimeout(() => loginDisabled.value = false, 100)
    }
  })
}

/**************** Table ****************/
const params = ref({
  content: ''
})

</script>

<style>
  thead tr th {
    @apply sticky top-0 z-50
  }
  td {
    @apply text-sm text-gray-500 font-normal
  }
</style>