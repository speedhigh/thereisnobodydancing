<template>
  <div class="bg-base-300 text-gray-900 min-h-screen h-full">
    <div class="container mx-auto max-w-[1366px] bg-base-100 min-h-screen cursor-default">
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
  @apply h-3 rounded-b-md bg-orange-50
}
::-webkit-scrollbar-thumb {
  @apply bg-orange-300 rounded cursor-pointer hover:bg-orange-400
}
::-webkit-scrollbar:vertical {
  @apply hidden
}
</style>
