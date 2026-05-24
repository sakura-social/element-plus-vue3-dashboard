<template>
  <div class="app-wrapper" :class="{ 'mobile': isMobile }">
    <div
      v-if="isMobile && sidebarOpened"
      class="drawer-bg"
      @click="closeSideBar"
    />
    <Sidebar
      v-if="sidebarMode === 'sidebar' || isMobile"
      class="sidebar-container"
      :class="{ 'is-collapse': isMobile ? false : sidebarOpened, 'drawer-bg': isMobile && sidebarOpened }"
      :is-collapse="isMobile ? false : sidebarOpened"
    />
    <SidebarLevel3
      v-else
      class="sidebar-level3-container"
      :class="{ 'is-collapse': sidebarOpened }"
      :is-collapse="sidebarOpened"
    />

    <div
      class="main-container"
      :class="{
        'main-no-sidebar': (sidebarOpened && !isMobile) || isMobile,
        'main-sidebar-level3': sidebarMode === 'sidebar-level3' && !sidebarOpened && !isMobile,
        'main-sidebar-level3-collapsed': sidebarMode === 'sidebar-level3' && sidebarOpened && !isMobile
      }"
    >
      <Navbar @toggle-sidebar="toggleSideBar" :sidebar-opened="sidebarOpened" :is-mobile="isMobile" />
      <TabBar />
      <div class="content-wrapper">
        <!-- Dashboard: rendered as Vue component -->
        <div v-show="activeTab === '/dashboard'" class="component-content">
          <router-view />
        </div>
        <!-- Other tabs: rendered as iframes -->
        <iframe
          v-for="tab in iframeTabs"
          :key="tab.path"
          v-show="tab.path === activeTab"
          :src="getFullUrl(tab.path)"
          class="iframe-content"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import SidebarLevel3 from './SidebarLevel3.vue'
import Navbar from './Navbar.vue'
import TabBar from './TabBar.vue'
import { useSidebarMode } from '@/composables/useSidebarMode'
import { useTabs } from '@/composables/useTabs'

const { sidebarMode } = useSidebarMode()
const { tabs, activeTab } = useTabs()
const sidebarOpened = ref(false)
const isMobile = ref(false)

// Dashboard is not rendered as iframe - it's a Vue component
const iframeTabs = computed(() => tabs.value.filter(t => t.path !== '/dashboard'))

const getFullUrl = (path: string) => {
  const baseUrl = window.location.origin
  return `${baseUrl}${path}`
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

const toggleSideBar = () => {
  sidebarOpened.value = !sidebarOpened.value
}

const closeSideBar = () => {
  sidebarOpened.value = false
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .drawer-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  &.mobile {
    .sidebar-container,
    .sidebar-level3-container {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1001;
      width: 75% !important;
      height: 100%;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      pointer-events: none;

      &.drawer-bg {
        transform: translateX(0);
        pointer-events: auto;
      }
    }

    .main-container {
      margin-left: 0 !important;
    }
  }
}

.main-container {
  min-height: 100vh;
  transition: margin-left 0.3s;
  margin-left: 210px;
  display: flex;
  flex-direction: column;

  &.main-no-sidebar {
    margin-left: 64px;
  }

  &.main-sidebar-level3 {
    margin-left: 420px;
  }

  &.main-sidebar-level3-collapsed {
    margin-left: 64px;
  }
}

.content-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #f0f2f5;

  .component-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .iframe-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    background: #f0f2f5;
  }
}
</style>