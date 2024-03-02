<script setup lang="ts">
import { ref } from 'vue'
import type { SbRepos } from '@/types/repo'

const model = defineModel<SbRepos>()
const selectedRepoIdSet = new Set<string>()

defineExpose({ repoIdSet: selectedRepoIdSet })

function selected(evt: MouseEvent) {
  const target = evt.target as HTMLElement

  if (target.classList.contains('project-grid')
    || target.classList.contains('name')) return

  const parent = target.closest('.project-item')
  if (!parent) return

  const status = parent.classList.toggle('is-active')
  const id = parent.getAttribute('data-id')!
  if (status) selectedRepoIdSet.add(id)
  else selectedRepoIdSet.delete(id)
}
</script>

<template>
  <div class="project-grid" @click="selected">
    <div v-for="{ node_id, metadata } in model" :key="node_id" class="project-item" :data-id="node_id">
      <div class="cover">{{ metadata.name.at(0)?.toUpperCase() }}</div>
      <div class="content">
        <a class="name" :href="metadata.html_url" target="_blank">{{ metadata.name }}</a>
        <div class="desc ellipsis-multiline">{{ metadata.description }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.project-grid {
  display: grid;
  margin: 5px;
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

  &.is-active {
    outline: 3px dashed get('color', 'danger-light-3');
  }

  .cover {
    float: left;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px; height: 100%;
    padding-top: 4px;
    margin-right: 5px;
    font: 600 24px BEYNO;
    cursor: default;
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

  .name {
    white-space: nowrap;
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
