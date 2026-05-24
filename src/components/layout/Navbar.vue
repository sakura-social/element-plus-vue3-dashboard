<template>
  <div class="navbar">
    <hamburger v-if="!isMobile" :is-active="sidebarOpened" @toggle-click="toggleSideBar" />
    <span v-else class="mobile-menu-icon" @click="toggleSideBar">
      <el-icon :size="20"><Menu /></el-icon>
    </span>

    <breadcrumb />

    <div class="right-menu">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <span class="user-name">Admin</span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import { ArrowDown, Menu } from '@element-plus/icons-vue'

defineProps({
  sidebarOpened: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-sidebar'])

const toggleSideBar = () => {
  emit('toggle-sidebar')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;

  .hamburger {
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .mobile-menu-icon {
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .right-menu {
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #303133;

      .user-name {
        margin-right: 5px;
      }
    }
  }
}
</style>