<template>
  <main class="space-y-5 relative">
    <!-- section  客户登记 -->
    <section class="w-full h-52 rounded-box shadow bg-base-100 p-5 space-y-7">
      <div class="flex items-center space-x-2.5">
        <div class="w-1.5 h-6 rounded bg-primary" />
        <h2 class="ml-2.5">客户登记</h2>
      </div>
      <div class="flex items-center space-x-5 px-2 text-gray-500">
        <!-- 客户姓名 -->
        <div class="flex items-center space-x-2">
          <p class="flex-shrink-0"><span class="text-primary">*</span>客户姓名</p>
          <input v-model="form.name" type="text" placeholder="请输入姓名" class="input w-28 bg-base-200 h-10" />
        </div>
        <!-- 客户手机号 -->
        <div class="flex items-center space-x-2">
          <p class="flex-shrink-0"><span class="text-primary">*</span>客户手机号</p>
          <input v-model="form.mobile" type="tel" placeholder="请输入手机号" maxlength="11" class="input w-32 bg-base-200 h-10" />
        </div>

        <!-- 所在地区 -->
        <div class="flex items-center space-x-2" @click="show=true">
          <p class="flex-shrink-0"><span class="text-primary">*</span>所在地区</p>
          <base-sift-city ref="siftCityRef" @change="changeCity" @clear="form.citycode = ''" />
        </div>

        <!-- 所属医院 -->
        <div class="flex items-center space-x-2">
          <p class="flex-shrink-0"><span class="text-primary">*</span>所属医院</p>
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
          <input v-model="params.content" type="text" placeholder="搜索关键词" class="bg-base-200 text-sm w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <!-- table -->
      <div class="mt-5 rounded-btn shadow-lg shadow-orange-200/50 overflow-scroll w-full max-h-[79vh] pb-2">
        <base-pagination
          ref="paginationRef"
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
                  <td>{{ item.name }}</td>
                  <!-- 登记时间 -->
                  <td>{{ dayjs(item.inserttime).format('YYYY-MM-DD HH:mm:ss') }}</td>
                  <!-- 手机号 -->
                  <td>{{ item.mobile }}</td>
                  <!-- 所属医院 -->
                  <td>{{ item.hosname }}</td>
                  <!-- 操作 -->
                  <td 
                    class="text-primary-focus text-center cursor-pointer"
                    @click="deleteCustomer(item.id)"
                  >
                    删除客户
                  </td>
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
import Dialog from '/src/components/Dialog/Dialog.js'
import { checkPhone } from '/src/until/index.js'
import api from '/src/api/index.js'
import BasePagination from '/src/components/BasePagination.vue'
import BaseSiftCity from '/src/components/BaseSiftCity.vue'
import dayjs from 'dayjs'

const form = reactive({
  name: '',
  mobile: '',
  hosname: '',
  citycode: ''
})

const btnDisabled = ref(false)
const paginationRef = ref()

/****************地区相关 ****************/
const siftCityRef = ref()
const changeCity = function(code){
  form.citycode = code
}
/**************** 登记 ****************/
const registered = function() {
  btnDisabled.value = true
  if(!form.name || !form.mobile || !form.hosname || !form.citycode) {
    Message({ text: '请填写完整信息' })
    btnDisabled.value = false
    return
  }
  if(!checkPhone(form.mobile)) {
    Message({ text: '手机号格式不正确'})
    btnDisabled.value = false
    return
  }
  api.post('/userdoctor/add', form, true).then((res) => {
    if(res.data === 'SUCCESS') {
      paginationRef.value.BasePaginationMitt.emit('refresh')
      Message({ text: '登记成功！', type: 'success' })
      sessionStorage.removeItem("doctorList")
      form.name = form.mobile = form.hosname = form.citycode = ''
      siftCityRef.value.clear()
      setTimeout(() => btnDisabled.value = false, 100)
    }
  })
}

/**************** Table ****************/
const params = ref({
  content: ''
})
// 删除客户
const deleteCustomer = function(id) {
  Dialog({ text: '您确定要在列表中删除改客户吗？' }).then(() => {
    api.get('/userdoctor/delete', { id: id }).then((res) => {
      if(res.data.code === 20000) {
        paginationRef.value.BasePaginationMitt.emit('refresh')
        Message({ text: '删除成功！', type: 'success' })
        sessionStorage.removeItem("doctorList")
      }
    })
  })
}

</script>

<style>
  thead tr th {
    @apply sticky top-0 z-50
  }
  td {
    @apply text-sm text-gray-500 font-normal
  }
</style>