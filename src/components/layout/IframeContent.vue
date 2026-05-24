<template>
  <div class="iframe-content">
    <iframe
      :src="src"
      class="iframe"
      :key="src"
      @load="handleLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
}

const props = defineProps<Props>()
const loading = ref(false)

const handleLoad = () => {
  loading.value = false
}
</script>

<style lang="scss" scoped>
.iframe-content {
  width: 100%;
  height: 100%;

  .iframe {
    width: 100%;
    height: 100%;
    border: none;
    background: #fff;
  }
}
</style>