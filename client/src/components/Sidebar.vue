<script setup lang="ts">
import { Files, Fries, Stopwatch, Tools } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const curRoute = router.currentRoute.value.fullPath.split('/').at(-1)
const menuItems = [
  { icon: Stopwatch, text: '仪表盘', route: 'dashboard' },
  { icon: Files, text: '文章', route: 'article' },
  { icon: Fries, text: '插件', route: 'plugin' },
  { icon: Tools, text: '设置', route: 'setting' },
]
</script>

<template>
  <ElAside width="200px">
    <ElMenu :default-active="curRoute" router>
      <ElMenuItem 
        v-for="item in menuItems" 
        :key="item.text" 
        :index="item.route"
      >
        <ElIcon><Component :is="item.icon" /></ElIcon>
        {{ item.text }}
      </ElMenuItem>
    </ElMenu>
  </ElAside>
</template>

<style lang="scss">
.el-menu {
  --el-menu-base-level-padding: 14px;
  --el-menu-item-height: 48px;
  height: 100%;
  padding-right: 12px;
  border-right-style: dashed;
}
.el-menu-item {
  border-radius: 8px;
}
</style>
