<script setup lang="ts">
import { Plus, Sort } from '@element-plus/icons-vue'
import { onBeforeMount, ref, watch } from 'vue'

import type { AritcleMeta, SubAritcles } from '@/types/aritcle'
import supabase from '@/api/supabase'
import { octokit } from '@/api/octokit'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const isloading = ref(false)
const isloadingAdd = ref(false)
const isloadingDel = ref(false)

const searchText = ref('')
const aritclesOrigin: SubAritcles = []
const aritcles = ref<SubAritcles>([])
const tagSet = {} as Record<string, number>

onBeforeMount(async () => {
  isloading.value = true

  const res = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: userStore.owner!,
      repo: `${userStore.owner}.github.io`,
      path: 'src/content/posts',
    },
  )
  await handleAritcleData(res.data as any)
})

async function handleAritcleData(posts: SubAritcles) {
  Promise.all(
    posts.map(async (post) => {
      const { name, path, sha, size } = post
      const response = await fetch(post.download_url!)
      const content = await response.text()
      const frontmatter = content.split('---')[1]
      const meta = handleFrontmatter(frontmatter)

      aritclesOrigin.push({ name, path, sha, size, content, meta })
    }),
  ).then(() => aritcles.value = sortByDate(aritclesOrigin))
    .finally(() => isloading.value = false)
}

function handleFrontmatter(frontmatter: string): AritcleMeta {
  const reg = /(\w+?)\s+:\s+(.+)/g
  const matchs = frontmatter.matchAll(reg) || []
  const result = {} as any

  for (const match of matchs) {
    const [_, key, value] = match
    // eslint-disable-next-line no-new-func
    const realVal = new Function(`return ${value}`)()

    if (key === 'tags') {
      realVal.forEach((tag: string) => {
        if (tagSet[tag]) tagSet[tag]++
        else tagSet[tag] = 1
      })
    }
    result[key] = realVal
  }

  return result
}

function sortByDate(aritcles: SubAritcles) {
  return aritcles.sort((a, b) => {
    const dateA = new Date(a.meta.date)
    const dateB = new Date(b.meta.date)
    return dateB.getTime() - dateA.getTime()
  })
}

async function handleAdd() {}
async function handleDel() {}

watch(searchText, (val) => {
  aritcles.value = aritclesOrigin.filter(item =>
    item.meta.title.includes(val)
    || item.meta.tags.includes(val)
    || item.meta.date.includes(val)
    || item.meta.description.includes(val),
  )
})
</script>

<template>
  <ElMain v-loading="isloading">
    <div class="header">
      <ElInput v-model="searchText" placeholder="请输入" />
      <div class="menu">
        <ElButton text bg circle :icon="Sort" :loading="isloadingDel" @click="handleDel" />
        <ElButton text bg circle :icon="Plus" :loading="isloadingAdd" @click="handleAdd" />
      </div>
    </div>
    <ul class="tags">
      <li
        v-for="[tag, count] in Object.entries(tagSet)"
        :key="tag" class="tag-item">
        {{ tag }} <span class="count">{{ count }}</span>
      </li>
    </ul>
    <div class="content">
      <ul class="aritcle-list">
        <AritcleItem
          v-for="item in aritcles"
          :key="item.name"
          :data="item.meta"
          :name="item.name" />
      </ul>
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

  .el-input {
    --el-input-width: 200px;
  }
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  padding: 0px;
  font-size: 14px;
  list-style: none;

  .tag-item {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 8px;
    border-radius: 4px;
    background-color: get('fill-color', 'light');
    cursor: pointer;

    .count {
      min-width: 16px;
      height: 16px;
      padding: 3px;
      text-align: center;
      border-radius: 50%;
      background-color: get('fill-color', 'dark')
    }
  }
}

.content {
  height: calc(100% - 92px);
  overflow: auto;
}

.aritcle-list {
  display: grid; gap: 12px;
  grid-template-columns: 1fr;
  padding: 0;

  @media (min-width: 1050px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
