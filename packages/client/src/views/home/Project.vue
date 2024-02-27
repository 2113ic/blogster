<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { Endpoints } from '@octokit/types'
import { HEADER_API, octokit } from '@/api/octokit'

type ProjectListType = Endpoints['GET /user/repos']['response']['data']

const activeName = ref('public')
const isloading = ref(false)
const publicList = ref<ProjectListType>([])
const priavteList = ref<ProjectListType>([])

onBeforeMount(async () => {
  isloading.value = true

  try {
    const response = await octokit.request(
      'GET /user/repos',
      { headers: HEADER_API },
    )

    if (response.status === 200) {
      for (const item of response.data) {
        if (item.private) priavteList.value.push(item)
        else publicList.value.push(item)
      }
    }
  }
  catch (err: any) {
    console.error('Failed to obtain project data.', err.message)
  }
  finally {
    isloading.value = false
  }
})
</script>

<template>
  <ElMain v-loading="isloading">
    <ElTabs v-model="activeName">
      <ElTabPane label="公开" name="public">
        <ProjectGrid :list="publicList" />
      </ElTabPane>
      <ElTabPane label="私有" name="priavte">
        <ProjectGrid :list="priavteList" />
      </ElTabPane>
    </ElTabs>
  </ElMain>
</template>

<style>
.el-main {
  padding: 0;
  margin: 12px 12px 0;
}

.el-tabs__content {
  overflow: auto;
  height: calc(100% - 60px);
}
</style>
