<template>
  <transition name="loading-fade">
    <div v-if="show" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <span v-if="text" class="loading-text">{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #409EFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    font-size: 14px;
    color: #606266;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.3s;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}
</style>