<script setup lang="ts">
import { provide, ref } from 'vue'

const isloading = ref(false)
provide('isloading', isloading)
</script>

<template>
  <ElContainer v-loading="isloading">
    <ElHeader>
      <TheLogo font-size="1.5em" />
      <div class="menu-box">
        <TheTheme />
        <UserMenu />
      </div>
    </ElHeader>
    <ElContainer>
      <Sidebar />
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </ElContainer>
  </ElContainer>
</template>

<style lang="scss">
.el-header {
  --el-header-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-container {
  & > & {
    height: calc(100vh - 56px);
    margin: 0 12px; padding: 16px 12px;
    background-color: get('bg-color');
    border-radius: 12px 12px 0 0;

    @include xs() {
      flex-direction: column;
    }
  }
}

.el-main {
  --el-main-padding: 0;

  @include xs() {
    --el-main-padding: 12px 0 0;
  }
}
</style>
