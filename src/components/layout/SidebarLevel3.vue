<template>
  <div class="sidebar-level3">
    <div class="level1-sidebar" :class="{ 'is-collapse': isCollapse }">
      <div class="level1-logo">
        <span v-if="!isCollapse" class="logo-text">POS Suite</span>
        <span v-else class="logo-icon">P</span>
      </div>
      <el-menu
        :default-active="level1Active"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        @select="handleLevel1Select"
      >
        <el-menu-item index="dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>Dashboard</template>
        </el-menu-item>

        <el-menu-item index="orders">
          <el-icon><ShoppingCart /></el-icon>
          <template #title>Orders</template>
        </el-menu-item>

        <el-menu-item index="products">
          <el-icon><Goods /></el-icon>
          <template #title>Products</template>
        </el-menu-item>

        <el-menu-item index="customers">
          <el-icon><User /></el-icon>
          <template #title>Customers</template>
        </el-menu-item>

        <el-menu-item index="inventory">
          <el-icon><Box /></el-icon>
          <template #title>Inventory</template>
        </el-menu-item>

        <el-menu-item index="reports">
          <el-icon><DataLine /></el-icon>
          <template #title>Reports</template>
        </el-menu-item>

        <el-menu-item index="pos">
          <el-icon><Monitor /></el-icon>
          <template #title>POS Terminal</template>
        </el-menu-item>

        <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <template #title>Settings</template>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="level2-sidebar" :class="{ 'is-collapse': isCollapse }">
      <div class="level2-header">
        <span class="level2-title">{{ currentLevel1Title }}</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        background-color="#1f2d3d"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        @select="handleLevel2Select"
      >
        <template v-for="item in level2Menu" :key="item.index">
          <el-menu-item :index="item.index">
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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

const { addTab } = useTabs()

const level1Active = ref('dashboard')

const menuMapping: Record<string, { title: string; children: { index: string; title: string }[] }> = {
  dashboard: { title: 'Dashboard', children: [{ index: '/dashboard', title: 'Dashboard' }] },
  orders: { title: 'Orders', children: [{ index: '/orders', title: 'Order List' }, { index: '/orders/create', title: 'Create Order' }] },
  products: { title: 'Products', children: [{ index: '/products', title: 'Product List' }, { index: '/products/categories', title: 'Categories' }] },
  customers: { title: 'Customers', children: [{ index: '/customers', title: 'Customers' }] },
  inventory: { title: 'Inventory', children: [{ index: '/inventory', title: 'Inventory' }] },
  reports: { title: 'Reports', children: [{ index: '/reports/sales', title: 'Sales Report' }, { index: '/reports/inventory', title: 'Inventory Report' }] },
  pos: { title: 'POS Terminal', children: [{ index: '/pos', title: 'POS Terminal' }] },
  settings: { title: 'Settings', children: [{ index: '/settings/general', title: 'General' }, { index: '/settings/users', title: 'Users' }] }
}

const currentLevel1Title = computed(() => {
  return menuMapping[level1Active.value]?.title || 'Menu'
})

const level2Menu = computed(() => {
  return menuMapping[level1Active.value]?.children || []
})

const activeMenu = computed(() => {
  const current = menuMapping[level1Active.value]?.children
  return current?.[0]?.index || '/dashboard'
})

const level2IconMapping: Record<string, string> = {
  '/dashboard': 'Odometer',
  '/orders': 'ShoppingCart',
  '/orders/create': 'ShoppingCart',
  '/products': 'Goods',
  '/products/categories': 'Goods',
  '/customers': 'User',
  '/inventory': 'Box',
  '/reports/sales': 'DataLine',
  '/reports/inventory': 'DataLine',
  '/pos': 'Monitor',
  '/settings/general': 'Setting',
  '/settings/users': 'Setting'
}

const handleLevel1Select = (index: string) => {
  level1Active.value = index
}

const handleLevel2Select = (index: string) => {
  const menu = menuMapping[level1Active.value]?.children.find(c => c.index === index)
  const icon = level2IconMapping[index]
  addTab(index, menu?.title || index, icon)
}
</script>

<style lang="scss" scoped>
.sidebar-level3 {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 1001;
  overflow: hidden;
}

.level1-sidebar {
  width: 210px;
  background: #304156;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.3s;

  &.is-collapse {
    width: 64px;
  }

  .level1-logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2b3a4a;
    flex-shrink: 0;
    overflow: hidden;

    .logo-text {
      color: #fff;
      font-size: 18px;
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

    .el-icon {
      margin-right: 12px;
      font-size: 18px;
      flex-shrink: 0;
    }

    &:hover {
      background: #263445 !important;
    }
  }

  :deep(.is-active) {
    background: #263445 !important;
    color: #409EFF !important;
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
}

.level2-sidebar {
  width: 210px;
  background: #1f2d3d;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-left: 1px solid #1a252f;
  transition: width 0.3s, opacity 0.3s;

  &.is-collapse {
    width: 0;
    opacity: 0;
  }

  .level2-header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: #1f2d3d;
    border-bottom: 1px solid #1a252f;

    .level2-title {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
    }
  }

  :deep(.el-menu) {
    flex: 1;
    overflow-y: auto;
    border: none;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #4a5568;
      border-radius: 3px;
    }
  }

  :deep(.el-menu-item) {
    height: 50px;
    line-height: 50px;
    color: #bfcbd9;
    padding-left: 20px !important;

    &:hover {
      background: #001528 !important;
    }

    &.is-active {
      background: #001528 !important;
      color: #409EFF !important;
    }
  }
}
</style>