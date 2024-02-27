<script setup lang="ts">
import { CaretTop, ChatLineSquare, Star, Tickets, View } from '@element-plus/icons-vue'

const statisticCards = [
  { title: '总浏览量', comparison: '较昨天', icon: View },
  { title: '创作', comparison: '较上月', icon: Tickets },
  { title: '评论', comparison: '较上周', icon: ChatLineSquare },
  { title: '点赞', comparison: '较上周', icon: Star },
]

const statisticValue = 98500
const increasePercentage = 24
</script>

<template>
  <div class="statistics-box">
    <div v-for="card in statisticCards" :key="card.title" class="statistic-card">
      <ElStatistic :value="statisticValue">
        <template #title>
          {{ card.title }}
          <ElIcon><Component :is="card.icon" /></ElIcon>
        </template>
      </ElStatistic>
      <div class="statistic-footer">
        <span>{{ card.comparison }}</span>
        <span class="increase">
          {{ increasePercentage }}%<ElIcon><CaretTop /></ElIcon>
        </span>
      </div>
    </div>
  </div>
  <div class="scheduled-tasks">
    <h2>定时任务</h2>
  </div>
</template>

<style lang="scss" scoped>
.statistics-box {
  display: grid;
  gap: 12px;
  padding-bottom: 12px;
  grid-template-columns: repeat(4, 1fr);

  .light &:first-child {
    border-bottom: 1px solid get('border-color', 'light');
  }

  @include sm() {
    grid-template-columns: repeat(3, 1fr);
  }

  @include xs() {
    grid-template-columns: repeat(2, 1fr);
  }
}

.scheduled-tasks {
  h2 {
    font-size: 18px;
  }
}

.el-statistic {
  --el-statistic-content-font-size: 28px;

  @at-root {
    .statistic-card {
      height: 100%;
      padding: 16px;
      border-radius: 4px;
      background-color: get(bg-color, overlay);
      box-sizing: border-box;

      .el-icon {
        vertical-align: -.25ex;
      }
    }

    .statistic-footer {
      margin-top: 16px;
      font-size: 12px;
      color: get(text-color, regular);

      span:last-child {
        margin-left: 4px;
      }
    }

    .increase { color: get(color, success); }
    .decrease { color: get(color, danger); }
  }
}
</style>
