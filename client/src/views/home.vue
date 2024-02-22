<script setup lang="ts"></script>

<template>
  <ElContainer>
    <ElHeader>
      <TheLogo font-size="1.5em" />
      <div class="menu-box">
        <TheTheme />
        <UserMenu />
      </div>
    </ElHeader>
    <ElContainer>
      <Sidebar />
      <ElMain><RouterView /></ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style lang="scss" scoped>
.el-header {
  --el-header-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-container {
  height: 100vh;

  & > & {
    margin: 0 12px;
    padding: 12px;
    background-color: get('bg-color');
    border-radius: 12px 12px 0 0;

    @include xs() {
      flex-direction: column;
    }
  }
}

.el-main {
  --el-main-padding: 12px;
}
</style>
