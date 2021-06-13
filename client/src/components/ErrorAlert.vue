<template>
  <div :class="`bg-${color}-50 text-${color}-600`"
       class="absolute top-0  right-0 left-0 space-x-2  p-4 rounded flex items-center  my-0 md:my-4 shadow-lg mx-auto max-w-lg w-full">
    <div class="">
      <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-5 pt-1" viewBox="0 0 24 24">
        <path
            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/>
      </svg>
    </div>
    <h3
        :class="`text-${color}-800 `" class="pl-4 tracking-wider flex-1">
      {{ res }}
    </h3>
    <button
        :class="`hover:bg-${color}-100 text-${color}-600  border-${color}-50 hover:border-${color}-300 hover:text-${color}-900`"
        class="inline-flex items-center  border  focus:outline-none rounded-full p-2 hover:cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 pt-1" viewBox="0 0 24 24">
        <path
            d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    res: {
      type: [Object,String],
      required: false
    },
    color: {
      type: String,
      required: false
    }
  },

}
</script>

<style scoped>

</style>