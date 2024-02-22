<script setup lang="ts">
import { useRouter } from 'vue-router'
import supabase from '@/api/supabase'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const router = useRouter()

async function signOut() {
  await supabase.auth.signOut({ scope: 'local' })
  userStore.$reset()
  router.replace('/login')
}
</script>

<template>
  <ElDropdown>
    <img class="avatar" :src="userStore.avatar_url" alt="avatar">
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
