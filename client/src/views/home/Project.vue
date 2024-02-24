<script setup lang="ts">
import { HEADER_API, octokit } from '@/api/octokit'

async function getProjectInfo() {
  const { data } = await octokit.request(
    'GET /user/repos',
    { headers: HEADER_API },
  )

  console.log(data)
}
</script>

<template>
  <ElButton @click="getProjectInfo">click</ElButton>
</template>
