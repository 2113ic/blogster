<script setup lang="ts">
import supabase from '@/api/supabase'

async function signInWithGithub() {
  await supabase.auth
    .signInWithOAuth({ provider: 'github' })
}
</script>

<template>
  Now with github connection...
  <ElButton @click="signInWithGithub">Sign In</ElButton>
</template>
