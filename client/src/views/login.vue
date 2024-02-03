<script setup lang="ts">
import { useNamespace } from '@icxy/ns'
import { ref } from 'vue'

const form = ref({
  account: '',
  password: '',
})

const [login] = useNamespace(['login'])
</script>

<template>
  <header>
    <TheLogo />
    <TheTheme />
  </header>
  <div :class="login()">
    <h2>登录</h2>
    <el-form :model="form" label-position="top">
      <el-form-item label="账号">
        <el-input
          v-model="form.account"
          placeholder="acount"
        />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="password"
        />
      </el-form-item>
    </el-form>
    <div :class="login.child('right')">
      <el-button style="width: 88px;" type="primary">登录</el-button>
    </div>
  </div>
</template>

<style lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  height: 72px;
  margin: 0 auto;
  padding: 0 24px;
}

@include b(login) {
  width: 300px;
  margin: 72px auto 0;
  padding: 24px;
  background-color: get('bg-color');
  border: 2px solid get('border-color', 'lighter');
  border-radius: 12px;
  box-sizing: border-box;

  h2 { margin-top: 0; }
  @include e(right) {
    text-align: right;
  }
}
</style>
