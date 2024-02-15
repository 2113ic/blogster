<script setup lang="ts">
import { DataAnalysis, Files, Fries, Message, Setting, Stopwatch, Sugar } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const curRoute = router.currentRoute.value.fullPath.split('/').at(-1)
const menuItems = [
  { icon: Stopwatch, text: '仪表盘', route: 'dashboard' },
  { icon: Sugar, text: '作品集', route: 'project' },
  { icon: Files, text: '文章', route: 'article' },
  { icon: Message, text: '消息', route: 'message' },
  { icon: Fries, text: '插件', route: 'plugin' },
  { icon: DataAnalysis, text: '日志', route: 'log' },
  { icon: Setting, text: '设置', route: 'setting' },
]

const asideWidth = ref('200px')
const windowWidth = useWindowSize().width

watch(windowWidth, (val) => {
  if (val > 768) {
    asideWidth.value = '200px'
    return
  }

  asideWidth.value = 'none'
}, { immediate: true })
</script>

<template>
  <ElAside :width="asideWidth">
    <ElMenu :default-active="curRoute" router>
      <ElMenuItem v-for="item in menuItems" :key="item.text" :index="item.route">
        <ElIcon>
          <Component :is="item.icon" />
        </ElIcon>
        <span class="menu-title">{{ item.text }}</span>
      </ElMenuItem>
    </ElMenu>
  </ElAside>
</template>

<style lang="scss">
.el-aside {
  border-right: 1px dashed var(--el-border-color);

  @include xs() {
    border: 0;
    border-bottom: 1px dashed var(--el-border-color);
  }

  &::-webkit-scrollbar {
    width: none;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border: 0;
  }
}

.el-menu {
  --el-menu-item-height: 42px;
  --el-menu-base-level-padding: 14px;
  height: 100%;
  padding-right: 12px;
  border: 0;

  @include xs() {
    padding: 0 0 12px 0;
    white-space: nowrap;

    .el-menu-item {
      display: inline-flex;

      .menu-title { display: none; }
      &.is-active>.menu-title {
        display: inline;
      }
    }
  }
}

.el-menu-item {
  gap: 5px;
  border-radius: 8px;

  .el-icon {
    margin: 0;
  }
}
</style>
