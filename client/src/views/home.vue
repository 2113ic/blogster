<template>
  <ElContainer>
    <ElHeader>
      <TheLogo
        font-size="18px"
        img-size="24px"
        style="height: 56px;"
      />
      <TheTheme />
    </ElHeader>
    <ElContainer>
      <Sidebar />
      <ElMain><RouterView /></ElMain>
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
  height: 100vh;

  & > & {
    margin: 0 12px;
    padding: 12px;
    background-color: get('bg-color');
    border-radius: 12px 12px 0 0;
  }
}
</style>
