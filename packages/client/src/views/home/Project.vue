<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { Endpoints } from '@octokit/types'
import { HEADER_API, octokit } from '@/api/octokit'

type ProjectListType = Endpoints['GET /user/repos']['response']['data']

const publicList = ref<ProjectListType>([])
const priavteList = ref<ProjectListType>([])

onBeforeMount(async () => {
  const { data } = await octokit.request(
    'GET /user/repos',
    { headers: HEADER_API },
  )

  for (const item of data) {
    if (item.private) priavteList.value.push(item)
    else publicList.value.push(item)
  }
})
</script>

<template>
  <div class="public-box">
    <h2 class="title" style="margin-top: 0;">公开</h2>
    <div class="grid">
      <div v-for="item in publicList" :key="item.id" class="item">
        <div class="cover">{{ item.name.at(0)?.toUpperCase() }}</div>
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="desc ellipsis-multiline">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="priavte-box">
    <h2 class="title">私有</h2>
    <div class="grid">
      <div v-for="item in priavteList" :key="item.id" class="item">
        <div class="cover">{{ item.name.at(0)?.toUpperCase() }}</div>
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="desc ellipsis-multiline">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.title {
  font-size: 18px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @include md() {
    grid-template-columns: repeat(3, 1fr);
  }

  @include sm() {
    grid-template-columns: repeat(2, 1fr);
  }

  @include xs() {
    grid-template-columns: repeat(1, 1fr);
  }

  .item {
    padding: 8px;
    background-color: get('fill-color', 'light');
    border-radius: 6px;
    overflow: hidden;

    .cover {
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px; height: 100%;
      font-weight: 600;
      overflow: hidden;
    }

    .content {
      overflow: hidden;
    }

    .desc {
      font-size: 12px;
      color: get('text-color', 'secondary');
    }
  }
}

.ellipsis-multiline {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
</style>
