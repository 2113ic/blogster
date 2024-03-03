<script setup lang="ts">
import type { Ref } from 'vue'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import supabase from '@/api/supabase'

const router = useRouter()
const userStore = useUserStore()
const isloading = inject('isloading') as Ref<boolean>

async function signOut() {
  isloading.value = true

  try {
    const { error } = await supabase.auth
      .signOut({ scope: 'local' })

    if (error) throw new Error(error.message)

    userStore.$reset()
    router.replace('/login')
  }
  catch (err) {
    if (err instanceof Error)
      console.error('Error logout with GitHub:', err.message)
  }
  finally {
    isloading.value = false
  }
}
</script>

<template>
  <ElDropdown>
    <img class="avatar" :src="userStore.avatarURL || '/logo.png'" alt="avatar">
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem>我的博客</ElDropdownItem>
        <ElDropdownItem @click="signOut">退出</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style>
.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 3px 0 0 12px;
}
</style>
