<template>
  <div class="tab-bar-container">
    <div class="tabs-wrapper">
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-click="handleTabClick"
        @tab-remove="handleTabRemove"
      >
        <el-tab-pane
          v-for="tab in tabs"
          :key="tab.path"
          :name="tab.path"
          :closable="tab.closable"
        >
          <template #label>
            <div class="tab-label">
              <span class="tab-title">{{ tab.title }}</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tabs-actions">
      <el-button size="small" @click="handleCloseAll">
        Close All
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTabs } from '@/composables/useTabs'
import type { TabsPaneContext } from 'element-plus'

const { tabs, activeTab, removeTab, closeAllTabs, setActiveTab } = useTabs()

const handleTabClick = (tab: TabsPaneContext) => {
  setActiveTab(tab.props.name as string)
}

const handleTabRemove = (path: string) => {
  removeTab(path)
}

const handleCloseAll = () => {
  closeAllTabs()
}

onMounted(() => {
  setActiveTab('/dashboard')
})
</script>

<style lang="scss" scoped>
.tab-bar-container {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 12px;
  height: 40px;

  .tabs-wrapper {
    flex: 1;
    overflow: hidden;

    :deep(.el-tabs) {
      height: 40px;

      .el-tabs__header {
        margin: 0;
        border: none;
      }

      .el-tabs__nav {
        border: none;
      }

      .el-tabs__item {
        height: 36px;
        line-height: 36px;
        background: #f5f7fa;
        border: none;
        border-radius: 4px 4px 0 0;
        margin-right: 4px;
        font-size: 13px;
        color: #606266;
        padding: 0 16px;
        transition: all 0.2s;

        &:hover {
          color: #409eff;
        }

        &.is-active {
          background: #409eff;
          color: #fff;
        }

        .tab-label {
          display: flex;
          align-items: center;
          gap: 6px;

          .tab-title {
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .el-icon-close {
          margin-left: 8px;
          color: #909399;

          &:hover {
            color: #f56c6c;
          }
        }
      }
    }
  }

  .tabs-actions {
    flex-shrink: 0;
    margin-left: 12px;
  }
}
</style>