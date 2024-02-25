<script setup lang="ts">
import { ref } from 'vue'
import supabase from '@/api/supabase'
import IconGithub from '~icons/carbon/logo-github'

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
  <div v-loading="isloading" class="wrapper">
    <header>
      <TheLogo />
      <div class="menu">
        <TheTheme />
        <ElButton
          color="#303133"
          :icon="IconGithub"
          @click="signInWithGithub"
        >
          Login
        </ElButton>
      </div>
    </header>
    <div class="login-card">
      <i-twemoji-construction />施工中...
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

  :deep(h1) { margin-top: 8px; }
  .menu {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.login-card {
  padding-top: 128px;
  text-align: center;

  svg {
    vertical-align: middle;
    margin-right: 8px;
  }
}
</style>
