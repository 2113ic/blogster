<script setup lang="ts">
import type { ArticleItemProps } from '@/types/aritcle'

const props = defineProps<ArticleItemProps>()
const _name = props.name.slice(0, -3).toLowerCase()
const path = `https://2113ic.github.io/posts/${_name}`
const _cover = `https://2113ic.github.io/cover/${props.data.cover}`
</script>

<template>
  <li class="article-item">
    <div class="content">
      <div class="head">
        <a :href="path" class="title" target="_blank">{{ data.title }}</a>
      </div>
      <div class="details">
        <div class="text">{{ data.description }}</div>

        <div class="meta-data">
          <div class="publish-info">
            <span class="date">{{ data.date }} 发布于</span>
            <a class="publish">{{ data.publish }}</a>
          </div>
          <div class="tags">
            <a v-for="tag in data.tags" :key="tag" class="tag">{{ tag }}</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.cover" class="cover">
      <img class="night" :src="_cover" loading="lazy">
    </div>
  </li>
</template>

<style lang="scss" scoped>
.article-item {
  display: flex;
  padding: 24px;
  border: 1px solid get('border-color', 'lighter');
  border-radius: 6px;
  overflow: hidden;

  .content {
    flex: 3;

    .text {
      font-size: 14px;
      color: get('text-color', 'secondary');
      margin: 12px 0;
    }
  }

  .cover {
    position: relative;
    flex: 1;

    img {
      position: absolute;
      right: -38px;
      top: 12px;
      width: 100%;
      border-radius: 6px;
      transform: rotate(-30deg);
      transition: all .2s .2s;

      @media (max-width: 768px) {
        right: -24px;
      }
    }

    &:hover img,
    img:hover {
      transform: translate(20%) scale(1.75);
    }
  }
}

.title {
  text-decoration: none;
  line-height: 1.75;
  font-weight: 600;
  font-size: 18px;
  color: get('color-primary');
  border-bottom: 1px dashed get('border-color', 'lighter');
  transition: color 0.3s;

  &:hover {
    border-bottom: 1px solid;
  }

  &:active {
    background-color: rgba(get('color-primary-rgb'), .6);
  }
}

.meta-data {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6px;
  color: get('text-color', 'secondary');
  font-size: 14px;

  .publish:hover {
    border-bottom: 1px solid get('border-color', 'lighter')
  }

  .tag {
    margin-left: 8px;
    padding: 4px 6px;
    font-size: 12px;
    text-transform: uppercase;
    background-color: get('fill-color', 'light');
    border-radius: 4px;
    cursor: default;

    &:first-of-type {
      margin-left: 0;
    }
  }
}
</style>
