<script setup lang="ts">
import { ref } from 'vue'
import IconGithub from '~icons/carbon/logo-github'
import supabase from '@/api/supabase'

const isloading = ref(false)

async function signInWithGithub() {
  isloading.value = true

  try {
    const { error } = await supabase.auth
      .signInWithOAuth({ provider: 'github' })

    if (error)
      throw new Error(error.message)
  }
  catch (e: any) {
    console.error('Error signing in with GitHub:', e.message)
  }
  finally {
    isloading.value = false
  }
}
</script>

<template>
  <div class="wrapper">
    <header>
      <TheLogo />
      <TheTheme />
    </header>
    <div class="login-card">
      <ElButton
        type="primary"
        :icon="IconGithub"
        @click="signInWithGithub"
      >
        Login
      </ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  --header-height: 72px;
  max-width: 380px;
  margin: 108px auto 0;
  padding: 0 24px 0;
  border-radius: 12px;
  background-color: get('bg-color');
  box-sizing: border-box;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  border-bottom: 1px dashed get('border-color', 'lighter');
  box-sizing: border-box;

  :deep(h1) { margin-top: 8px; }
}

.login-card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 128px;
}
</style>
