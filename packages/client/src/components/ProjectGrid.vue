<script setup lang="ts">
import type { Endpoints } from '@octokit/types'
import type { Ref } from 'vue'
import { inject } from 'vue'

type ProjectListType = Endpoints['GET /user/repos']['response']['data']

const props = defineProps<{
  list: ProjectListType
}>()

const selectedID = inject('selectedID') as Ref<string[]>

function selected(evt: MouseEvent) {
  const target = evt.target as HTMLElement

  if (target.classList.contains('project-grid')
    || target.classList.contains('name')) return

  const parent = target.closest('.project-item')

  if (parent) {
    parent.classList.toggle('is-active')
    selectedID.value.push(parent.getAttribute('data-id')!)
  }
}
</script>

<template>
  <div class="project-grid" @click="selected">
    <div
      v-for="item in props.list"
      :key="item.node_id"
      :data-id="item.node_id"
      class="project-item"
    >
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

  &.is-active {
    outline: 3px dashed get('color', 'danger-light-3');
  }

  .cover {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px; height: 100%;
    font-weight: 600;
    overflow: hidden;
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
