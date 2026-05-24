<template>
  <div class="sidebar-container" :class="{ 'is-collapse': isCollapse }">
    <div class="logo-container">
      <span v-if="!isCollapse" class="logo-text">POS Suite</span>
      <span v-else class="logo-icon">P</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      :unique-opened="true"
      active-text-color="#409EFF"
      :collapse-transition="false"
      mode="vertical"
      @select="handleSelect"
    >
      <el-menu-item index="/dashboard">
        <el-icon><Odometer /></el-icon>
        <template #title>Dashboard</template>
      </el-menu-item>

      <el-sub-menu index="orders">
        <template #title>
          <el-icon><ShoppingCart /></el-icon>
          <template v-if="!isCollapse">Orders</template>
        </template>
        <el-menu-item index="/orders">Order List</el-menu-item>
        <el-menu-item index="/orders/create">Create Order</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="products">
        <template #title>
          <el-icon><Goods /></el-icon>
          <template v-if="!isCollapse">Products</template>
        </template>
        <el-menu-item index="/products">Product List</el-menu-item>
        <el-menu-item index="/products/categories">Categories</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/customers">
        <el-icon><User /></el-icon>
        <template #title>Customers</template>
      </el-menu-item>

      <el-menu-item index="/inventory">
        <el-icon><Box /></el-icon>
        <template #title>Inventory</template>
      </el-menu-item>

      <el-sub-menu index="reports">
        <template #title>
          <el-icon><DataLine /></el-icon>
          <template v-if="!isCollapse">Reports</template>
        </template>
        <el-menu-item index="/reports/sales">Sales Report</el-menu-item>
        <el-menu-item index="/reports/inventory">Inventory Report</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/pos">
        <el-icon><Monitor /></el-icon>
        <template #title>POS Terminal</template>
      </el-menu-item>

      <el-sub-menu index="settings">
        <template #title>
          <el-icon><Setting /></el-icon>
          <template v-if="!isCollapse">Settings</template>
        </template>
        <el-menu-item index="/settings/general">General</el-menu-item>
        <el-menu-item index="/settings/users">Users</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Odometer,
  ShoppingCart,
  Goods,
  User,
  Box,
  DataLine,
  Monitor,
  Setting
} from '@element-plus/icons-vue'
import { useTabs } from '@/composables/useTabs'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const { addTab } = useTabs()

const activeMenu = computed(() => route.path)

const menuMapping: Record<string, { title: string; icon?: string }> = {
  '/dashboard': { title: 'Dashboard', icon: 'Odometer' },
  '/orders': { title: 'Order List', icon: 'ShoppingCart' },
  '/orders/create': { title: 'Create Order', icon: 'ShoppingCart' },
  '/products': { title: 'Product List', icon: 'Goods' },
  '/products/categories': { title: 'Categories', icon: 'Goods' },
  '/customers': { title: 'Customers', icon: 'User' },
  '/inventory': { title: 'Inventory', icon: 'Box' },
  '/reports/sales': { title: 'Sales Report', icon: 'DataLine' },
  '/reports/inventory': { title: 'Inventory Report', icon: 'DataLine' },
  '/pos': { title: 'POS Terminal', icon: 'Monitor' },
  '/settings/general': { title: 'General', icon: 'Setting' },
  '/settings/users': { title: 'Users', icon: 'Setting' }
}

const handleSelect = (index: string) => {
  const menu = menuMapping[index]
  if (menu) {
    addTab(index, menu.title, menu.icon)
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #304156;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  transition: width 0.3s;

  width: 210px;

  &.is-collapse {
    width: 64px;
  }
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b3a4a;
  flex-shrink: 0;
  overflow: hidden;

  .logo-text {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  .logo-icon {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }
}

:deep(.el-menu) {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  border: none;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4a5568;
    border-radius: 3px;
  }
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  height: 50px;
  line-height: 50px;
  color: #bfcbd9;
  overflow: hidden;

  .el-icon {
    margin-right: 12px;
    font-size: 18px;
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background: #263445 !important;
  }
}

:deep(.is-active) {
  background: #263445 !important;
  color: #409EFF !important;

  .el-icon {
    color: #409EFF;
  }
}

:deep(.el-sub-menu) {
  .el-menu-item {
    background: #1f2d3d !important;
    padding-left: 50px !important;

    &:hover {
      background: #001528 !important;
    }
  }
}
</style>