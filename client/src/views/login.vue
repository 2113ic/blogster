<script setup lang="ts">
import { Connection } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

const router = useRouter()
const isGithubForm = ref(false)

const supabaseForm = ref({
  supabaseUrl: '',
  supabaseKey: '',
})
const githubForm = ref({
  clientID: '',
  clientSecrets: '',
})
</script>

<template>
  <div class="wrapper">
    <header>
      <TheLogo style="margin-top: 8px;" />
      <TheTheme />
    </header>
  
    <div v-if="!isGithubForm" class="login">
      <h2>连接 Supabase</h2>
      <ElForm :model="supabaseForm" label-position="top">
        <!-- Supabase Form -->
        <ElFormItem label="访问链接:">
          <ElInput v-model="supabaseForm.supabaseUrl" placeholder="supabase url" type="url" />
        </ElFormItem>
        <ElFormItem label="访问令牌:">
          <ElInput v-model="supabaseForm.supabaseKey" type="textarea" placeholder="supabase key" />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="isGithubForm = true">下一步</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
    <div v-if="isGithubForm" class="login">
      <h2>GitHub 授权登录</h2>
      <ElForm :model="githubForm" label-position="top">
        <ElFormItem label="客户端 ID:">
          <ElInput v-model="githubForm.clientID" placeholder="Github Client ID" />
        </ElFormItem>
        <ElFormItem label="访问令牌:">
          <ElInput v-model="githubForm.clientSecrets" type="textarea" placeholder="Github Client Secrets" />
        </ElFormItem>
        <ElFormItem>
          <ElButton bg text @click="isGithubForm = false">上一步</ElButton>
          <ElButton type="primary" :icon="Connection" @click="router.push('/home')">
            连接
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  max-width: 1100px;
  height: calc(100vh - 24px);
  margin: 24px auto 0;
  background-color: get('bg-color');
  border-radius: 8px 8px 0 0;
  box-sizing: border-box;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 24px;
  border-bottom: 1px dashed get('border-color');
  box-sizing: border-box;
}

.login {
  width: 256px;
  padding: 2em;
  margin: 5em auto 0;
  border: 1px solid get('border-color', 'lighter');
  border-radius: 8px;

  h2 {
    margin-top: 0;
    font-size: 22px;
  }
}

.el-form-item:last-child {
  margin-bottom: 0;

  &:deep(.el-form-item__content) {
    justify-content: flex-end;
  }
}
</style>
