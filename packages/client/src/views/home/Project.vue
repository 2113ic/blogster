<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed, onBeforeMount, onMounted, ref, toRaw, watch } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import ProjectGrid from '@/components/ProjectGrid.vue'

import type { Repos, SbProjectResponse, SbRepos } from '@/types/repo'
import supabase from '@/api/supabase'
import { octokit } from '@/api/octokit'
import { useUserStore } from '@/store/user'

const isloading = ref(false)
const isloadingAdd = ref(false)
const isloadingSave = ref(false)
const isDialogOpen = ref(false)

let rawRepos: Repos
const searchText = ref('')
const displayRepos = ref<SbRepos>([])
const filteredRepos = ref<SbRepos>([])
const existedRepoId = ref<string[]>([])
const displayGridRef = ref<InstanceType<typeof ProjectGrid> | null>(null)
const filteredGridRef = ref<InstanceType<typeof ProjectGrid> | null>(null)

const userStore = useUserStore()

onBeforeMount(async () => {
  isloading.value = true

  try {
    const { data } = await supabase
      .from('project').select()
      .throwOnError()

    if (data) {
      displayRepos.value = data
      existedRepoId.value = getExistRepoId(data)
    }
  }
  catch (err) {
    if (err instanceof Error)
      console.error('SUPABASE ERROR:', err.message)
  }
  finally {
    isloading.value = false
  }
})

watch(searchText, (val) => {
  const bucket = []

  for (const repo of rawRepos) {
    if (repo.name.includes(val)) {
      bucket.push({
        node_id: repo.node_id,
        metadata: repo,
      })
    }
  }
  filteredRepos.value = bucket
})

function getExistRepoId(repos: SbProjectResponse[]) {
  return repos.map(repo => repo.node_id)
}

async function handleAdd() {
  isloadingAdd.value = true

  try {
    const res = await octokit.request(
      'GET /user/repos',
      { type: 'public', sort: 'created' },
    )

    rawRepos = res.data
    isDialogOpen.value = true
    filteredRepos.value = transformRepo(res.data)
  }
  catch (err) {
    if (err instanceof Error)
      console.error('GITHUB ERROR:', err.message)
  }
  finally {
    isloadingAdd.value = false
  }
}

function transformRepo(repos: Repos) {
  const result = [] as SbRepos

  for (const repo of repos) {
    if (existedRepoId.value.includes(repo.node_id)) continue
    result.push({ node_id: repo.node_id, metadata: repo })
  }
  return result
}

async function handleDel() {}

async function handleDialogSave() {
  isloadingSave.value = true
  const filtered = rawRepos.filter(item =>
    filteredGridRef.value!.repoIdSet.has(item.node_id),
  )

  const data = filtered.map(item => ({
    node_id: item.node_id,
    metadata: toRaw(item),
    uid: userStore.id,
  }))

  try {
    const res = await supabase.from('project')
      .upsert(data).select()
      .throwOnError()
    displayRepos.value = res.data!
  }
  catch (err) {
    if (err instanceof Error)
      console.error('SUPABASE ERROR:', err.message)
  }
  finally {
    isloadingSave.value = false
    isDialogOpen.value = false
  }
}

function handleCancel() {
  isDialogOpen.value = false
  filteredGridRef.value!.repoIdSet.clear()
}
</script>

<template>
  <ElMain v-loading="isloading">
    <div class="header">
      <ElButton text bg circle :icon="Delete" @click="handleDel" />
      <ElButton text bg circle :icon="Plus" :loading="isloadingAdd" @click="handleAdd" />
    </div>
    <ProjectGrid ref="displayGridRef" v-model="displayRepos" class="project-show" />
  </ElMain>
  <ElDialog v-model="isDialogOpen" :show-close="false" width="85%" top="8vh" append-to-body>
    <template #header>
      <span class="dialog-title">添加项目</span>
      <ElInput
        v-model.lazy.trim="searchText"
        type="text" placeholder="搜索项目"
      />
    </template>
    <ProjectGrid ref="filteredGridRef" v-model="filteredRepos" />
    <template #footer>
      <ElButton bg text @click="handleCancel">取消</ElButton>
      <ElButton type="primary" :loading="isloadingSave" @click="handleDialogSave">保存</ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss">
@use '@et/dialog-project';
</style>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 12px;
  overflow: hidden;
}

.project-show {
  position: relative;
  max-height: calc(100% - 76px);
  padding: 5px;
  overflow: auto;
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
