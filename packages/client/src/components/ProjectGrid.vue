<script setup lang="ts">
import type { Endpoints } from '@octokit/types'

type ProjectListType = Endpoints['GET /user/repos']['response']['data']

const props = defineProps<{
  list: ProjectListType
}>()
</script>

<template>
  <div class="project-grid">
    <div v-for="item in props.list" :key="item.id" class="project-item">
      <div class="cover">{{ item.name.at(0)?.toUpperCase() }}</div>
      <div class="content">
        <a class="name" :href="item.html_url" target="_blank">{{ item.name }}</a>
        <div class="desc ellipsis-multiline">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.project-grid {
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
}

.project-item {
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
    height: 100%;
    overflow: hidden;
  }

  .name {
    color: get('color', 'primary-dark-2');
  }

  .desc {
    color: get('text-color', 'secondary');
    font-size: 12px;
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
