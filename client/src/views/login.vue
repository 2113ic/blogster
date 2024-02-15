<script setup lang="ts">
import { useNamespace } from '@icxy/ns'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

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
    <ElForm :model="form" label-position="top">
      <ElFormItem label="账号">
        <ElInput
          v-model="form.account"
          placeholder="acount"
        />
      </ElFormItem>
      <ElFormItem label="密码">
        <ElInput
          v-model="form.password"
          type="password"
          placeholder="password"
        />
      </ElFormItem>
    </ElForm>
    <div :class="login.child('right')">
      <ElButton style="width: 88px;" type="primary" @click="router.push('/home')">登录</ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
