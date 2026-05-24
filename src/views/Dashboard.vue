<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="sidebar-switcher">
          <span class="switcher-label">Sidebar Mode:</span>
          <el-radio-group v-model="sidebarMode" size="default">
            <el-radio-button value="sidebar">Sidebar</el-radio-button>
            <el-radio-button value="sidebar-level3">SidebarLevel3</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="12" :sm="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="shopping" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Total Orders</div>
            <div class="card-panel-num">6,520</div>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Revenue</div>
            <div class="card-panel-num">¥128,430</div>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-peoples">
            <svg-icon icon-class="peoples" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Customers</div>
            <div class="card-panel-num">8,246</div>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="6">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Messages</div>
            <div class="card-panel-num">1,842</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="16">
        <div class="chart-panel">
          <div class="chart-panel-header">
            <span>Transaction History</span>
            <el-button-group size="small">
              <el-button>Day</el-button>
              <el-button>Week</el-button>
              <el-button>Month</el-button>
            </el-button-group>
          </div>
          <div class="chart-panel-body">
            <div class="chart-box">
              <div class="bar" style="height: 60%"></div>
              <div class="bar" style="height: 80%"></div>
              <div class="bar" style="height: 45%"></div>
              <div class="bar" style="height: 90%"></div>
              <div class="bar" style="height: 70%"></div>
              <div class="bar" style="height: 55%"></div>
              <div class="bar" style="height: 85%"></div>
            </div>
            <div class="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="8">
        <div class="chart-panel">
          <div class="chart-panel-header">
            <span>Progress</span>
          </div>
          <div class="chart-panel-body">
            <div class="progress-list">
              <div class="progress-item">
                <span>Sales</span>
                <el-progress :percentage="72" :stroke-width="10" />
              </div>
              <div class="progress-item">
                <span>Orders</span>
                <el-progress :percentage="58" :stroke-width="10" />
              </div>
              <div class="progress-item">
                <span>Revenue</span>
                <el-progress :percentage="85" :stroke-width="10" />
              </div>
              <div class="progress-item">
                <span>Customers</span>
                <el-progress :percentage="45" :stroke-width="10" />
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useSidebarMode } from '@/composables/useSidebarMode'

const { sidebarMode } = useSidebarMode()
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
}

.sidebar-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: #fff;
  border-radius: 4px;

  .switcher-label {
    font-size: 14px;
    color: #606266;
    font-weight: 500;
  }
}

.card-panel {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;

  .card-panel-icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;

    &.icon-shopping { background: #E6F7FF; }
    &.icon-money { background: #FFF7E6; }
    &.icon-peoples { background: #F6FFED; }
    &.icon-message { background: #F9F0FF; }

    .card-panel-icon {
      width: 30px;
      height: 30px;
      color: #303133;
    }
  }

  .card-panel-description {
    .card-panel-text {
      font-size: 14px;
      color: #909399;
      margin-bottom: 8px;
    }

    .card-panel-num {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
    }
  }
}

.chart-panel {
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;

  .chart-panel-header {
    padding: 15px 20px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 16px;
      color: #303133;
      font-weight: 500;
    }
  }

  .chart-panel-body {
    padding: 20px;
  }
}

.chart-box {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  padding-bottom: 10px;

  .bar {
    width: 50px;
    background: linear-gradient(to top, #409EFF, #79BBFF);
    border-radius: 4px 4px 0 0;
  }
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #f0f0f0;
  padding-top: 10px;

  span {
    font-size: 12px;
    color: #909399;
  }
}

.progress-list {
  .progress-item {
    margin-bottom: 20px;

    span {
      display: block;
      font-size: 14px;
      color: #606266;
      margin-bottom: 8px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>