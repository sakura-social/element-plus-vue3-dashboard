<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h2>Login</h2>
        </div>
      </template>

      <el-form :model="form" label-position="top">
        <el-form-item label="Email">
          <el-input v-model="form.email" placeholder="Enter email" />
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" placeholder="Enter password" show-password />
        </el-form-item>

        <el-button type="primary" style="width: 100%" @click="login">
          Login
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  email: '',
  password: '',
})

const login = (): void => {
  router.push('/dashboard')
  console.log('login', form)
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}

.login-card {
  width: 400px;
  border-radius: 12px;
}

.card-header {
  text-align: center;
}
</style>