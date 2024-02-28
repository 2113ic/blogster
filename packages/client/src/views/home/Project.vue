<script setup lang="ts">
import { provide, ref } from 'vue'
import type { Endpoints } from '@octokit/types'
import { Delete, Plus } from '@element-plus/icons-vue'
import { HEADER_API, octokit } from '@/api/octokit'

type ProjectListType = Endpoints['GET /user/repos']['response']['data']

const isloading = ref(false)
const isloadingBtn = ref(false)
const dialogOpen = ref(false)

const publicList = ref<ProjectListType>([])
const showList = ref<ProjectListType>([])
const selectedID = ref<string[]>([])

provide('selectedID', selectedID)

async function handleAdd() {
  isloadingBtn.value = true

  try {
    const response = await octokit.request(
      'GET /user/repos',
      { headers: HEADER_API },
    )

    if (response.status === 200) {
      publicList.value = response.data.filter(e => !e.private)
      dialogOpen.value = true
    }
  }
  catch (err: any) {
    console.error('Failed to obtain project data.', err.message)
  }
  finally {
    isloadingBtn.value = false
  }
}

function handleDialogClose() {
  showList.value = publicList.value.filter(item => selectedID.value.includes(item.node_id))
}
</script>

<template>
  <ElMain v-loading="isloading">
    <div class="header">
      <ElButton
        text bg circle disabled
        :icon="Delete"
        @click="handleAdd"
      />
      <ElButton
        text bg circle
        :icon="Plus"
        :loading="isloadingBtn"
        @click="handleAdd"
      />
    </div>
    <ProjectGrid class="project-show" :list="showList" />
  </ElMain>
  <ElDialog
    v-model="dialogOpen"
    width="85%" top="8vh"
    :show-close="false"
    @close="handleDialogClose"
  >
    <template #header>
      <div class="dialog-title">添加项目</div>
      <ElInput class="x-input" type="text" placeholder="搜索项目" />
    </template>
    <ProjectGrid :list="publicList" />
  </ElDialog>
</template>

<style lang="scss">
.el-main {
  padding: 0;
  margin: 12px 12px 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 24px;
}

.el-dialog {
  --el-dialog-padding-primary: 24px;
  --dialog-height: 84vh;
  max-height: var(--dialog-height);
  border-radius: 12px;

  .dialog-title {
    font-size: 18px;
    margin-bottom: 16px;
  }

  &__body {
    max-height: calc(var(--dialog-height) - 156px);
    padding: 5px;
    overflow-y: auto;
  }
}

.project-show {
  position: relative;
  padding: 5px;
  border-radius: 8px;

  &:empty{
    height: 250px;

    &::after {
      content: '这里空空如也';
      position: absolute;
      top: 50%; left: 50%;
      color: get('text-color', 'secondary');
      transform: translate(-50%, -50%);
    }
  }
}
</style>
