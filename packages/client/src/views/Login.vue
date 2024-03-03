<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import IconGithub from '@icons/Github.vue'
import { useRouter } from 'vue-router'
import supabase from '@/api/supabase'

interface FormData {
  email: string
  password: string
}

const router = useRouter()
const isloading = ref(false)

const formRef = ref<FormInstance>()
const form = ref({ email: '', password: '' })
const rules = ref<FormRules<FormData>>({
  email: {
    required: true,
    type: 'email',
    message: '邮件地址无效',
    trigger: 'blur',
  },
  password: {
    required: true,
    min: 8,
    message: '密码不能少于8个字符',
    trigger: 'blur',
  },
})

async function signInWithGithub() {
  isloading.value = true

  try {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        scopes: 'public_repo,workflow',
      },
    })
  }
  catch (err) {
    if (err instanceof Error) {
      console.error(err)
      ElMessage.error({
        message: `Error signing in with GitHub: ${err.message}`,
        type: 'error',
      })
    }
  }
  finally {
    isloading.value = false
  }
}

async function login() {
  await formRef.value?.validate((vaild) => {
    if (vaild) signIn()
  })
}

async function signIn() {
  isloading.value = true

  try {
    const { error } = await supabase.auth
      .signInWithPassword({
        email: form.value.email,
        password: form.value.password,
      })

    if (error) throw error
    router.replace('/')
  }
  catch (err) {
    if (err instanceof Error) {
      console.error(err)
      ElMessage({ message: err.message, type: 'error' })
    }
  }
  finally {
    isloading.value = false
  }
}
</script>

<template>
  <div v-loading="isloading" class="wrapper">
    <header>
      <TheLogo />
      <div class="menu">
        <TheTheme />
        <ElButton color="#303133" :icon="IconGithub" @click="signInWithGithub">
          Login
        </ElButton>
      </div>
    </header>
    <div class="login-card">
      <h2>登录</h2>
      <ElForm ref="formRef" :model="form" :rules="rules" label-position="top" hide-required-asterisk>
        <ElFormItem label="邮件" prop="email">
          <ElInput v-model="form.email" placeholder="xxxx@xxx.com" />
        </ElFormItem>
        <ElFormItem label="密码" prop="password">
          <ElInput v-model="form.password" type="password" placeholder="8位数 & 强密码" />
        </ElFormItem>
        <ElButton type="primary" @click="login">登录</ElButton>
      </ElForm>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  --header-height: 72px;
  --margin-top: 12px;
  max-width: 1000px;
  height: calc(100vh - var(--margin-top));
  margin: var(--margin-top) auto 0;
  padding: 0 24px 0;
  border-radius: 12px 12px 0 0;
  background-color: get('bg-color');
  box-sizing: border-box;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  border-bottom: 1px dashed get('border-color');
  box-sizing: border-box;

  :deep(h1) {
    margin-top: 8px;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.login-card {
  max-width: 300px;
  margin: 100px auto 0;
  padding: 24px;
  text-align: right;
  border-radius: 12px;
  border: 2px solid get('border-color', 'lighter');
  box-sizing: border-box;

  h2 {
    margin-top: 0;
    text-align: left;
  }

  svg {
    vertical-align: middle;
    margin-right: 8px;
  }
}
</style>
