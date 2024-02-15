<script setup lang="ts">
import { useNamespace } from '@icxy/ns'

const props = defineProps({
  title: {
    default: 'BLOG SYSTEM',
    type: String,
  },
  fontSize: {
    default: '24px',
    type: String,
  },
  imgSize: {
    default: '32px',
    type: String,
  },
})
const ns = useNamespace('logo')
</script>

<template>
  <div :class="ns()">
    <img :style="{ width: props.imgSize }" src="/logo.svg" alt="logo">
    <h1 :style="{ fontSize: props.fontSize }">{{ props.title }}</h1>
  </div>
</template>

<style lang="scss">
@include b(logo) {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  user-select: none;

  h1 {
    margin: 0;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }

  @include xs() {
    h1 { display: none; }
  }
}
</style>
