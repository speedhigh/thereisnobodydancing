<template>
  <div class="bg-base-300 text-gray-900 min-h-screen h-full">
    <div class="container mx-auto max-w-[1366px] min-h-screen cursor-default bg-gray-50">
      <router-view />
    </div>
  </div>
</template>

<style>
input, button, select, textarea {
  outline: none !important
}
textarea {
  resize: none !important
}
::-webkit-scrollbar {
  @apply h-2 rounded-btn bg-orange-50
}
::-webkit-scrollbar-thumb {
  @apply bg-orange-400 rounded cursor-pointer hover:bg-orange-400
}
::-webkit-scrollbar:vertical {
  @apply hidden
}
</style>
