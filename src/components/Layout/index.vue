<template>
  <div class="relative pt-16">
    <!-- header -->
    <LayoutHeader />
    <div class="relative">
      <!-- menu -->
      <LayoutMenu />
      <!-- content -->
      <div class="pl-[16.25rem] w-full p-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '/src/api/index.js'
import LayoutHeader from './LayoutHeader.vue'
import LayoutMenu from './LayoutMenu.vue'

const options = { timeout: 9000 }
let geolocation = new qq.maps.Geolocation()
const getCurLocation = function () {
  geolocation.getLocation(showPosition, showErr, options)
}

const showPosition = function (position) {
  console.log(position.lat, position.lng)
  api.post('/position/uploadTrackPoint', { location: position.lng + ',' + position.lat, tid: '550801603' }, true)
}

const showErr = function () {
  console.log('定位失败！')
}

const timer = ref(null)

onMounted(() => {
  timer.value = setInterval(async () => {
    getCurLocation()
  }, 10000)
})
</script>