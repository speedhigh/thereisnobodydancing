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
  @apply hidden
}
::-webkit-scrollbar-thumb {
  @apply hidden
}
::-webkit-scrollbar:vertical {
  @apply hidden
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.member-form,.rpo-form input[type="number"] {
  -moz-appearance: textfield;
}
</style>
