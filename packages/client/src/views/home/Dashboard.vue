<script setup lang="ts">
import { CaretTop, ChatLineSquare, Delete, Plus, Refresh, Star, Tickets, View } from '@element-plus/icons-vue'
import { onBeforeMount, ref } from 'vue'
import { ElMessage } from 'element-plus'

import supabase from '@/api/supabase'
import { octokit } from '@/api/octokit'
import { useUserStore } from '@/store/user'

const isloading = ref(false)
const isloadingAdd = ref(false)
const isloadingDel = ref(false)
const userStore = useUserStore()

const statisticCards = [
  { title: '总浏览量', comparison: '较昨天', icon: View },
  { title: '创作', comparison: '较上月', icon: Tickets },
  { title: '评论', comparison: '较上周', icon: ChatLineSquare },
  { title: '点赞', comparison: '较上周', icon: Star },
]

const statisticValue = 98500
const increasePercentage = 24

function handleWorkFlowList(_list: any) {}

// Github rest api

// 获取工作流信息
onBeforeMount(async () => {
  isloading.value = true

  try {
    const res = await octokit.request(
      'GET /repos/{owner}/{repo}/actions/workflows',
      {
        owner: userStore.owner!,
        repo: `${userStore.name}.github.io`,
      },
    )

    handleWorkFlowList(res.data)
  }
  catch (err) {
    if (err instanceof Error) {
      ElMessage.error(err.message)
      console.error('GITHUB', err)
    }
  }
  finally {
    isloading.value = false
  }
})

// 添加github 工作流
async function handleAdd() {
  isloadingAdd.value = true

  try {
    const res = await octokit.request(
      'POST /repos/{owner}/{repo}/actions/workflows',
      {
        owner: userStore.owner!,
        repo: `${userStore.name}.github.io`,
        // name: '工作流名',
        // config: 工作流配置,
      },
    )

    handleWorkFlowList(res.data)
    ElMessage.success('添加成功')
  }
  catch (err) {
    if (err instanceof Error) {
      ElMessage.error(err.message)
      console.error('GITHUB', err)
    }
  }
  finally {
    isloadingAdd.value = false
  }
}

// 删除github 工作流
async function handleDel() {
  isloadingDel.value = true

  try {
    const res = await octokit.request(
      'DELETE /repos/{owner}/{repo}/actions/workflows/{workflow_id}',
      {
        owner: userStore.owner!,
        repo: `${userStore.name}.github.io`,
        workflow_id: '工作流id',
      },
    )

    handleWorkFlowList(res.data)
    ElMessage.success('删除成功')
  }
  catch (err) {
    if (err instanceof Error) {
      ElMessage.error(err.message)
      console.error('GITHUB', err)
    }
  }
  finally {
    isloadingDel.value = false
  }
}

// 重新运行 github 工作流
async function handleRefresh() {
  isloading.value = true

  try {
    const res = await octokit.request(
      'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs',
      {
        owner: userStore.owner!,
        repo: `${userStore.name}.github.io`,
        workflow_id: '工作流id',
      },
    )
    handleWorkFlowList(res.data)
    ElMessage.success('重新运行成功')
  }
  catch (err) {
    if (err instanceof Error) {
      ElMessage.error(err.message)
      console.error('GITHUB', err)
    }
  }
  finally {
    isloading.value = false
  }
}
</script>

<template>
  <ElMain v-loading="isloading">
    <div class="statistics-box">
      <div v-for="card in statisticCards" :key="card.title" class="statistic-card">
        <ElStatistic :value="statisticValue">
          <template #title>
            {{ card.title }}
            <ElIcon><Component :is="card.icon" /></ElIcon>
          </template>
        </ElStatistic>
        <div class="statistic-footer">
          <span>{{ card.comparison }}</span>
          <span class="increase">
            {{ increasePercentage }}%<ElIcon><CaretTop /></ElIcon>
          </span>
        </div>
      </div>
    </div>
    <div class="scheduled-tasks">
      <div class="header">
        <h2>定时任务</h2>

        <span class="menu">
          <ElButton text bg circle :icon="Refresh" @click="handleRefresh" />
          <ElButton text bg circle :icon="Delete" :loading="isloadingDel" @click="handleDel" />
          <ElButton text bg circle :icon="Plus" :loading="isloadingAdd" @click="handleAdd" />
        </span>
      </div>
    </div>
  </ElMain>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  overflow: hidden;
}

.statistics-box {
  display: grid;
  gap: 12px;
  padding-bottom: 12px;
  grid-template-columns: repeat(4, 1fr);

  .light &:first-child {
    border-bottom: 1px solid get('border-color', 'light');
  }

  @include sm() {
    grid-template-columns: repeat(3, 1fr);
  }

  @include xs() {
    grid-template-columns: repeat(2, 1fr);
  }
}

.scheduled-tasks {
  h2 {
    font-size: 18px;
  }
}

.el-statistic {
  --el-statistic-content-font-size: 28px;

  @at-root {
    .statistic-card {
      height: 100%;
      padding: 16px;
      border-radius: 4px;
      background-color: get(bg-color, overlay);
      box-sizing: border-box;

      .el-icon {
        vertical-align: -.25ex;
      }
    }

    .statistic-footer {
      margin-top: 16px;
      font-size: 12px;
      color: get(text-color, regular);

      span:last-child {
        margin-left: 4px;
      }
    }

    .increase { color: get(color, success); }
    .decrease { color: get(color, danger); }
  }
}
</style>
